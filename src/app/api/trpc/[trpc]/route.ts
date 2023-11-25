import { appRouter } from "@/trcp";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handleRequest(req: Request) {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // @ts-expect-error context already passed from express middleware
    createContext: () => ({}),
  });
}

export { handleRequest as GET, handleRequest as POST };
