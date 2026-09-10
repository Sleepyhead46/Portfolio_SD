import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Check for optional CRON_SECRET if caller provides Authorization header
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { status: "unauthorized", message: "Invalid authorization credentials." },
      { status: 401 }
    );
  }

  if (!supabase) {
    return NextResponse.json(
      {
        status: "degraded",
        database: "not_configured",
        message: "Supabase client is not configured.",
        timestamp,
      },
      { status: 503 }
    );
  }

  try {
    // Perform a lightweight count query to exercise the connection
    const { count, error, status } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true });

    const latencyMs = Date.now() - startTime;

    if (error) {
      return NextResponse.json(
        {
          status: "unhealthy",
          database: "error",
          httpStatus: status,
          error: error.message,
          latencyMs,
          timestamp,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        status: "healthy",
        database: "connected",
        messageCount: count ?? 0,
        latencyMs,
        timestamp,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err) {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json(
      {
        status: "error",
        database: "unreachable",
        error: err instanceof Error ? err.message : "Unknown error",
        latencyMs,
        timestamp,
      },
      { status: 500 }
    );
  }
}
