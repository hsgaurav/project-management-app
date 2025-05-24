import { beforeAll, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";

beforeAll(() => {
  process.env.SKIP_ENV_VALIDATION = "true";
  process.env.NODE_ENV = "test";
  process.env.NEXTAUTH_URL = "http://localhost:3000";
  process.env.NEXTAUTH_SECRET = "test-secret";
  process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
  process.env.DISCORD_CLIENT_ID = "test-discord-id";
  process.env.DISCORD_CLIENT_SECRET = "test-discord-secret";
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  cleanup();
}); 