CREATE TABLE "cart_items" (
  "id" SERIAL PRIMARY KEY,
  "cartId" INT,
  "productId" INT,
  "qty" INT,
  FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);