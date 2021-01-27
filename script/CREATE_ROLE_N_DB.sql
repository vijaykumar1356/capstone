-- creates role named capstone with database creation privilege
CREATE ROLE capstone
CREATEDB
LOGIN
PASSWORD '123456789';

-- creates database capstone and ecommerce
CREATE DATABASE capstone
WITH OWNER capstone;

-- CREATE DATABASE ecommerce
-- WITH OWNER capstone;
