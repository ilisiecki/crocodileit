import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  testApiRoute: publicProcedure.query(() => {
    return "hello world from tRPC";
  }),
});

export type AppRouter = typeof appRouter;
