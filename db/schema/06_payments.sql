CREATE TABLE "payments" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  "date" TIMESTAMP,
  "totalPrice" DECIMAL(10, 2),
  "stripeChargeId" VARCHAR(255),
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE
);
