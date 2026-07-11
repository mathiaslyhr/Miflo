// Apple App Site Association — lets iOS open miflo.dk/join/<code> links
// directly in the Miflo app (Universal Links). Apple fetches
// /.well-known/apple-app-site-association, which next.config.ts rewrites here
// (the App Router can't route dot-prefixed folders); a route handler
// guarantees the application/json content type Apple requires.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    applinks: {
      details: [
        {
          appIDs: ["U326NK67AQ.com.mathiaslyhr.miflo"],
          components: [{ "/": "/join/*" }, { "/": "/add/*" }],
        },
      ],
    },
  });
}
