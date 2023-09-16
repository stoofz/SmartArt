CREATE TABLE "order_items" (
  "id" SERIAL PRIMARY KEY,
  "orderId" INT,
  "productId" INT,
  "qty" INT,
  "price" DECIMAL(10, 2),
  FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);