CREATE TABLE "feedback" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  "productId" INT,
  "rating" INT,
  "comment" VARCHAR(255),
  "date" TIMESTAMP,
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);