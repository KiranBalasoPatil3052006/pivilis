import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env?.DB) {
    console.warn("Cloudflare D1 binding `DB` is not active in this local environment.");
    return null as any;
  }

  try {
    return drizzle(env.DB, { schema });
  } catch (error) {
    console.warn("Could not initialize drizzle with D1:", error);
    return null as any;
  }
}
