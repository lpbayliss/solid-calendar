import { eventsRouter } from './routers/events';
import { exampleRouter } from './routers/example';
import { createTRPCRouter } from './utils';

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
