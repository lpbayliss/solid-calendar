import { wrap } from '@typeschema/valibot';
import { literal, union } from 'valibot';
import { createTRPCRouter, publicProcedure } from '../utils';
import { events } from '../../db/schema';
import { eq, or } from 'drizzle-orm';
import { db } from '~/server/db';
import dayjs from 'dayjs';

export const eventsRouter = createTRPCRouter({
  findAllEvents: publicProcedure
    .input(wrap(union([literal('week'), literal('day')])))
    .query(async ({ input }) => {
      const daysToQuery = [];

      if (input === 'day') daysToQuery.push(dayjs().format('YYYY-MM-DD'));
      else if (input === 'week') {
        const start = dayjs().startOf('week');
        for (let i = 0; i < 7; i++) {
          daysToQuery.push(start.add(i, 'day').format('YYYY-MM-DD'));
        }
      }

      const result = await db
        .select({
          id: events.id,
          title: events.title,
          startDate: events.startDate,
          endDate: events.endDate,
          startHour: events.startHour,
          startMinute: events.startMinute,
          duration: events.duration,
        })
        .from(events)
        .where(
          or(
            ...daysToQuery.map((day) => eq(events.startDate, day)),
            ...daysToQuery.map((day) => eq(events.endDate, day)),
          ),
        );

      if (!result.length) return [];

      return result
        .map((event) => {
          const start = dayjs(event.startDate, 'YYYY-MM-DD')
            .startOf('day')
            .add(event.startHour ?? 0, 'hour')
            .add(event.startMinute ?? 0, 'minute');

          const end = start.add(event.duration ?? 0, 'minute');

          return {
            id: event.id,
            title: event.title,
            start: start.toDate(),
            end: end.toDate(),
          };
        })
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
        }));
    }),
});
