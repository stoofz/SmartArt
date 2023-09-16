CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "subId" VARCHAR(255),
  "stripeId" VARCHAR(255) UNIQUE
);
