declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    PIVILIS_OWNER_EMAIL?: string;
    BUCKET?: R2Bucket;
  }
}
