CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  "street" VARCHAR(255),
  "city" VARCHAR(255),
  "province" VARCHAR(255),
  "country" VARCHAR(255),
  "postal" VARCHAR(255),
  "phone" VARCHAR(255),
  "billing" BOOLEAN,
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE
);
