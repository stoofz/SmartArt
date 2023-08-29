DROP TABLE IF EXISTS carts CASCADE;

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  cart_id INTEGER NOT NULL REFERENCES carts (id) ON DELETE CASCADE,
  qty INTEGER,
  --  created_at TIMESTAMP DEFAULT current_timestamp,
  -- updated_at TIMESTAMP DEFAULT current_timestamp,
);