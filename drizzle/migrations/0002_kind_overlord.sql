ALTER TABLE `events` ADD `start_minute` integer;--> statement-breakpoint
ALTER TABLE `events` ADD `duration` integer;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `end_hour`;