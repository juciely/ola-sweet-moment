import { createRequestHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";

const handler = createRequestHandler({
  createRouter,
  getRouter,
});

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    return handler(request, env, ctx);
  },
};

