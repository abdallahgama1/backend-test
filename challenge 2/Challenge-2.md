## Objective
Write optimized SQL/NoSQL queries to retrieve product data efficiently.

---

## 1. SQL Query: PostgreSQL

### Query to Fetch Products with a Price Between $50 and $200, Ordered by Price (Ascending), with Pagination (10 Products per Page)

```sql
-- SQL Query to retrieve products with price between $50 and $200, ordered by price in ascending order, with pagination (10 products per page)

SELECT * 
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10 OFFSET $1
```

### Optimization for High Traffic:

#### ** 1- Indexing :**
CREATE INDEX idx_price ON products(price);

```sql
CREATE INDEX idx_price ON products(price);
```

#### ** 2- Query Caching :**

Use application-level caching for frequently queried products. For example, caching results for popular price ranges (e.g., $50-$100) could reduce query load.
Consider query result caching in PostgreSQL using a caching layer like Redis.



## 2. NoSQL Query: MongoDB

### Query to Retrieve Products by Category (e.g., "Electronics"), Sorted by Price (Descending), Limited to 5 Products per Page

```js 
db.products.find({ category: "Electronics" })
    .sort({ price: -1 }) 
    .skip(5 * (page - 1)) 
    .limit(5);  
```

### Optimization for High Traffic:

#### ** 1- Indexing :**

Create an index on the category and price fields to speed up the filtering and sorting operations.

```js
db.products.createIndex({ category: 1, price: -1 });
```

#### ** 2- Sharding :**

If the dataset is extremely large, consider sharding the products collection based on the category field. This will distribute the load across multiple servers and improve query performance.

```js 
sh.shardCollection("products", { category: 1 });
```

#### ** 2- Caching :**

Use application-level caching (e.g., Redis) for commonly queried categories (like "Electronics").
Cache the results of the query for frequently requested pages.