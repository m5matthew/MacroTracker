/* These tables are created in the "macro_tracker" database 
   Command: psql -f db/schema.sql macro_tracker
*/

DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS meals;

CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    protein NUMERIC DEFAULT 0,
    fat NUMERIC DEFAULT 0,
    carbs NUMERIC DEFAULT 0
);

CREATE TABLE IF NOT EXISTS entries (
    date TIMESTAMP NOT NULL,
    meal_id INT,
    quantity NUMERIC DEFAULT 1,
    FOREIGN KEY (meal_id)
        REFERENCES meals (id)
);