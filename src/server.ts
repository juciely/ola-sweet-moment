import { createRequestHandler } from "@tanstack/react-router";
import { getRouter } from "./router";

const handler = createRequestHandler({
  createRouter: getRouter,
});

export default {
  async fetch(request: Request) {
    return handler({ request });
  },
};
