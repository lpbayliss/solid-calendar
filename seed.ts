import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./src/server/db/schema";

export const sqlite = new Database("./drizzle/db.sqlite");
export const db = drizzle(sqlite, { schema });

const main = async () => {
  await db.insert(schema.users).values({
    username: "Admin",
  });

  console.log("Seeded!");
};

main();
