import { createRequestHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";

const handler = createRequestHandler({
  createRouter: getRouter,
});

export default {
  async fetch(request: Request, env: any, ctx: any) {
    return (handler as any)(request, env, ctx);
  },
};
