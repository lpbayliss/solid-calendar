import { wrap } from '@typeschema/valibot';
import { number } from 'valibot';
import { createTRPCRouter, publicProcedure } from '../utils';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '~/server/db';

const greeting = (username: string) => `Hello ${username}!`;

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(wrap(number())).query(async ({ input }) => {
    const result = await db
      .select({
        username: users.username,
      })
      .from(users)
      .where(eq(users.id, input));
    if (!result.length) return 'User not found';

    const user = result[0];

    return greeting(user.username);
  }),
});
