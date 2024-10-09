import { type SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let { user_version: currentDbVersion }: any = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  console.log("currentDbVersion", currentDbVersion);

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  DROP TABLE IF EXISTS plan_goals;
  DROP TABLE IF EXISTS progress_tracking;
  DROP TABLE IF EXISTS daily_calories;

  CREATE TABLE plan_goals(
    id INTEGER PRIMARY KEY NOT NULL, 
    name TEXT NOT NULL, 
    goal_weight REAL, 
    caloIn REAL, 
    sex TEXT,
    excerises TEXT, 
    duration INTEGER,
    status TEXT CHECK(status IN ('Not Started', 'In Progress', 'Completed')) DEFAULT 'Not Started',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE progress_tracking(
    id INTEGER PRIMARY KEY NOT NULL,
    plan_id INTEGER,
    weight REAL,
    date DATE NOT NULL,
    min REAL,
    workout INTEGER,
    calo_consumed REAL
  );
  CREATE TABLE daily_calories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE NOT NULL,
      total_calories REAL,
      total_food INTEGER
  );
  `);
    currentDbVersion = 0;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
