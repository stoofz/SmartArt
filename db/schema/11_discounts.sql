CREATE TABLE "discounts" (
  "id" SERIAL PRIMARY KEY,
  "productId" INT,
  "discount" INT,
  "startDate" TIMESTAMP,
  "endDate" TIMESTAMP,
  "description" VARCHAR(255),
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);