import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input: any) {
    return {
      name: "project-management-app",
      region: "us-east-1",
    };
  },
  stacks(app: any) {
    app.stack(function Site({ stack }: any) {
      const nextjsSiteUrl = app.stage === "prod" 
        ? "https://your-domain.com" 
        : `https://project-management-app-${app.stage}.sst.dev`;

      const site = new NextjsSite(stack, "site", {
        customDomain:
          app.stage === "prod"
            ? {
                domainName: "your-domain.com",
                domainAlias: "www.your-domain.com",
              }
            : undefined,
        environment: {
          STAGE: app.stage,
          DATABASE_URL: process.env.DATABASE_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          NEXTAUTH_URL: nextjsSiteUrl,
          DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
          DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig; 