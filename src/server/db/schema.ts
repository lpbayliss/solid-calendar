import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey().unique().notNull(),
  username: text('username').notNull().default(''),
});

export const events = sqliteTable('events', {
  id: integer('id').primaryKey().unique().notNull(),
  title: text('title').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  startHour: integer('start_hour'),
  startMinute: integer('start_minute'),
  duration: integer('duration'),
});
