import handler from "vinext/server/app-router-entry";

interface WorkerEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface WorkerContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

export default {
  fetch(request: Request, env: WorkerEnv, context: WorkerContext) {
    return handler.fetch(request, env, context);
  },
};
