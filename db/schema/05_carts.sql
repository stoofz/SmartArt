CREATE TABLE "carts" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE
);