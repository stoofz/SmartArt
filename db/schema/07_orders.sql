CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  "paymentId" INT,
  "orderDate" TIMESTAMP,
  "totalPrice" DECIMAL(10, 2),
  "orderStatus" VARCHAR(255),
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE,
  FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE CASCADE
);
