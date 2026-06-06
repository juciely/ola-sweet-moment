import { createRequestHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";

export default {
  async fetch(request: Request) {
    return createRequestHandler({
      createRouter: getRouter,
      request,
    });
  },
};
