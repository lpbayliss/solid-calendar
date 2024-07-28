import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './src/server/db/schema';
import dayjs from 'dayjs';
import * as v from 'valibot';

const EventSchema = v.object({
  title: v.string(),
  startDate: v.pipe(
    v.string(),
    v.regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/),
  ),
  endDate: v.optional(
    v.pipe(
      v.string(),
      v.regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/),
    ),
  ),
  startHour: v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(23))),
  startMinute: v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(59))),
  duration: v.nullable(v.pipe(v.number(), v.minValue(0))),
});

type Event = v.InferInput<typeof EventSchema>;

export const sqlite = new Database('./drizzle/db.sqlite');
export const db = drizzle(sqlite, { schema });

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateEvent = (): Event => {
  const dayOffset = randomInt(0, 7);
  const hourOffset = randomInt(0, 23);
  const minuteOffset = randomInt(0, 59);
  const duration = randomInt(0, 120);

  const eventDate = dayjs()
    .startOf('week')
    .add(dayOffset, 'day')
    .add(hourOffset, 'hour')
    .add(minuteOffset, 'minute');

  return {
    title: `Test Event ${dayOffset}`,
    startDate: eventDate.format('YYYY-MM-DD'),
    startHour: eventDate.get('hour'),
    startMinute: eventDate.get('minute'),
    duration,
  };
};

const main = async () => {
  await db
    .insert(schema.users)
    .values({
      username: 'Admin',
    })
    .onConflictDoNothing();

  for (let i = 0; i < 10; i++) {
    await db.insert(schema.events).values(generateEvent());
  }

  console.log('Seeded!');
};

main();
