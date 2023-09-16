CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "subId" VARCHAR(255),
  "stripeId" VARCHAR(255) UNIQUE
);


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


CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255)
);


CREATE TABLE "payments" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  "date" TIMESTAMP,
  "totalPrice" DECIMAL(10, 2),
  "stripeChargeId" VARCHAR(255),
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE
);


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

CREATE TABLE "carts" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE
);

CREATE TABLE "cart_items" (
  "id" SERIAL PRIMARY KEY,
  "cartId" INT,
  "productId" INT,
  "qty" INT,
  FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);

CREATE TABLE "order_items" (
  "id" SERIAL PRIMARY KEY,
  "orderId" INT,
  "productId" INT,
  "qty" INT,
  "price" DECIMAL(10, 2),
  FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);

CREATE TABLE "wishlists" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INT,
  "productId" INT,
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);

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


CREATE TABLE "discounts" (
  "id" SERIAL PRIMARY KEY,
  "productId" INT,
  "discount" INT,
  "startDate" TIMESTAMP,
  "endDate" TIMESTAMP,
  "description" VARCHAR(255),
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
);


CREATE TABLE "admins" (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "subId" VARCHAR(255)
);
