DROP TABLE IF EXISTS discounts CASCADE;

CREATE TABLE discounts (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products (id) ON DELETE CASCADE,
  discount INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description VARCHAR(255) NOT NULL
);