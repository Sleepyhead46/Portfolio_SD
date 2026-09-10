#!/usr/bin/env node
/**
 * Supabase Keep-Alive / Health Check Script
 * 
 * Prevents Supabase free-tier projects from pausing due to inactivity.
 * Designed to be executed server-side via GitHub Actions or Cron.
 * Reads credentials from environment variables securely without exposing secrets to client bundles.
 */

import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Attempt to load local environment files if running outside CI
const envFiles = [".env.local", ".env"];
for (const file of envFiles) {
  const filePath = resolve(process.cwd(), file);
  if (existsSync(filePath)) {
    try {
      const content = readFileSync(filePath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    } catch {
      // Ignore errors loading local env files
    }
  }
}

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

async function runKeepAlive() {
  const startTime = Date.now();
  console.log("=================================================");
  console.log(" 🛰️  Supabase Keep-Alive Health Check");
  console.log(` ⏰ Timestamp: ${new Date().toISOString()}`);
  console.log("=================================================");

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERROR: Missing Supabase credentials.");
    console.error("Please configure SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY).");
    process.exit(1);
  }

  // Mask project URL for safe logging in CI
  const urlObj = new URL(supabaseUrl);
  console.log(`🔗 Target Host: ${urlObj.hostname}`);

  const client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  try {
    // Perform a lightweight head/count query against the contact_messages table
    // This executes a real PostgreSQL query without returning or modifying any data
    const { count, error, status } = await client
      .from("contact_messages")
      .select("id", { count: "exact", head: true });

    const latencyMs = Date.now() - startTime;

    if (error) {
      // If table doesn't exist or RLS blocks head count, attempt fallback REST ping
      console.warn(`⚠️ Query warning (${status}): ${error.message}`);
      console.log("Attempting fallback connection test...");
      
      const res = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      if (res.ok) {
        console.log(`✅ Fallback REST ping successful! Status: ${res.status}`);
        console.log(`⏱️ Roundtrip latency: ${Date.now() - startTime}ms`);
        console.log("🎉 Supabase instance is active and warm.");
        process.exitCode = 0;
        return;
      } else {
        throw new Error(`Fallback ping failed with status: ${res.status}`);
      }
    }

    console.log(`✅ Supabase Database Connection Successful!`);
    console.log(`📊 HTTP Status: ${status}`);
    console.log(`📈 Message count: ${count ?? 0}`);
    console.log(`⏱️ Total Latency: ${latencyMs}ms`);
    console.log("🎉 Project activity registered. Keep-alive successful!");
    process.exitCode = 0;
    return;
  } catch (err) {
    const totalTime = Date.now() - startTime;
    console.error(`❌ Keep-alive failed after ${totalTime}ms:`, err.message || err);
    process.exitCode = 1;
    return;
  }
}

runKeepAlive();
