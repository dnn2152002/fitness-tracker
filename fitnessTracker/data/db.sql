CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    weight REAL,
    height REAL,
    gender TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE food_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    food_name TEXT NOT NULL,
    calories REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    plan_name TEXT NOT NULL,
    goal_weight REAL,
    start_date DATE,
    end_date DATE,
    status TEXT CHECK(status IN ('Not Started', 'In Progress', 'Completed')) DEFAULT 'Not Started',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE plan_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER,
    goal_name TEXT NOT NULL,
    status TEXT CHECK(status IN ('Not Started', 'In Progress', 'Completed')) DEFAULT 'Not Started',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);
CREATE TABLE progress_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    plan_id INTEGER,
    date DATE NOT NULL,
    weight REAL,
    calories_consumed REAL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);
CREATE TABLE support_resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resource_type TEXT CHECK(resource_type IN ('Blog', 'Video')) NOT NULL,
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE daily_calories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date DATE NOT NULL,
    total_calories REAL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
