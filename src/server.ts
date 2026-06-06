if (process.env.NODE_ENV === "production" && !process.env.NITRO_PORT && !process.env.LOVABLE_PREVIEW) {
  console.log(`\n🚀 Server starting on port: ${process.env.PORT || 3000}`);
}
import "./validate-env";
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true')) {
    return response;
  }

  const error = consumeLastCapturedError() ?? new Error(`SSR error: ${body}`);
  console.error('Normalized SSR Error:', error);
  const errorDetails = error instanceof Error ? error.stack : String(error);

  return new Response(
    `<!doctype html><html><body><h1>Internal Server Error</h1><pre>${errorDetails}</pre></body></html>`,
    {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    }
  );
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error: any) {
      if (error && typeof error === 'object' && ('to' in error || 'href' in error || 'status' in error)) {
         throw error;
      }
      console.error('SSR Critical Failure:', error);
      return new Response(
        `<!doctype html><html><body><h1>Internal Server Error</h1><pre>${error?.stack || String(error)}</pre></body></html>`,
        {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }
      );
    }
  },
};
