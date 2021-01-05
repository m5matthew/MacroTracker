/* These tables are created in the "macro_tracker" database */

DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS meals;

CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    protein INT DEFAULT 0,
    fat INT DEFAULT 0,
    carbs INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS entries (
    date TIMESTAMP NOT NULL,
    meal_id INT,
    FOREIGN KEY (meal_id)
        REFERENCES meals (id)
);