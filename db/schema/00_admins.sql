CREATE TABLE "admins" (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "subId" VARCHAR(255)
);
