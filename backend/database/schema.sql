DROP DATABASE IF EXISTS product_reviews_database;

CREATE DATABASE product_reviews_database;

\c product_reviews_database;

CREATE TABLE reviews (
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "rating" INT NOT NULL,
  "date" BIGINT,
  "summary" VARCHAR(255),
  "body" VARCHAR(550),
  "recommend" BOOLEAN,
  "reported" BOOLEAN,
  "reviewer_name" VARCHAR(100),
  "reviewer_email" VARCHAR(100),
  "reponse" VARCHAR(255),
  "helpfulness" INT NOT NULL
);

\COPY reviews
FROM '/Users/kevinz/Documents/RFP2209/SDC-Data/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE reviews_photos (
  "id" SERIAL PRIMARY KEY,
  "review_id" INT,
  "url" VARCHAR(255),
  FOREIGN KEY (review_id)
      REFERENCES reviews (id)
);

\COPY reviews_photos
FROM '/Users/kevinz/Documents/RFP2209/SDC-Data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristics (
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "name" VARCHAR(100)
);

\COPY characteristics
FROM '/Users/kevinz/Documents/RFP2209/SDC-Data/characteristics.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristic_reviews (
  "id" INT PRIMARY KEY,
  "characteristic_id" INT,
  "review_id" INT,
  "value" INT,
  FOREIGN KEY (characteristic_id)
      REFERENCES characteristics (id),
  FOREIGN KEY (review_id)
      REFERENCES reviews (id)
);

\COPY characteristics
FROM '/Users/kevinz/Documents/RFP2209/SDC-Data/characteristics.csv'
DELIMITER ','
CSV HEADER;

-- CREATE INDEX product_index ON reviews (product_id);
-- CREATE INDEX review_id_on_photos ON reviews_photos (review_id);