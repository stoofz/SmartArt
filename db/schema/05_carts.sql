DROP TABLE IF EXISTS carts CASCADE;

CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER NOT NULL REFERENCES customers (id) ON DELETE CASCADE,
--  created_at TIMESTAMP DEFAULT current_timestamp,
--   updated_at TIMESTAMP DEFAULT current_timestamp,
  
);