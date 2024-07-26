import { initTRPC } from "@trpc/server";
import { db } from "../db";

export const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
