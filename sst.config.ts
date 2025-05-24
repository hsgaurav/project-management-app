/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "project-management-app",
      region: "us-east-1",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const site = new sst.aws.Nextjs("NextjsSite", {
      environment: {
        DATABASE_URL: process.env.DATABASE_URL!,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
        NEXTAUTH_URL: $app.stage === "production" 
          ? "https://your-domain.com" 
          : `https://${$app.name}-${$app.stage}.sst.dev`,
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
        DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      },
    });

    return {
      url: site.url,
    };
  },
}); 