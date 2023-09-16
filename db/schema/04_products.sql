CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "categoryId" INT,
  "name" VARCHAR(255),
  "artist" VARCHAR(255),
  "country" VARCHAR(255),
  "dimensions" VARCHAR(255),
  "price" DECIMAL(10, 2),
  "stock" INT,
  "image" VARCHAR(255),
  "description" TEXT,
  FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE
);