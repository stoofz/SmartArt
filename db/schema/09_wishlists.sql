CREATE TABLE "wishlists" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  "productId" INT,
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);