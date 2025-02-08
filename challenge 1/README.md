# Product API Documentation

## Base URL:

```
http://yourdomain.com/api/products
```

---

## **1. Get All Products**

### **Endpoint:**

```
GET /api/products
```

### **Query Parameters:**

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| page      | Number | (Optional) Page number for pagination. Default is `1`.           |
| limit     | Number | (Optional) Number of products per page. Default is `10`.         |
| category  | String | (Optional) Filter products by category.                          |
| sort      | String | (Optional) Sorting criteria (e.g., `-createdAt` for descending). |

### **Response:**

#### **Success (200 OK):**

```json
{
  "products": [
    {
      "_id": "65a1234abcd5678",
      "name": "Product Name",
      "category": "Electronics",
      "price": 199.99,
      "quantity": 10
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

#### **Error (500 Internal Server Error):**

```json
{
  "error": "Failed to fetch products"
}
```

---

## **2. Get Product by ID**

### **Endpoint:**

```
GET /api/products/:id
```

### **Response:**

#### **Success (200 OK):**

```json
{
  "_id": "65a1234abcd5678",
  "name": "Product Name",
  "category": "Electronics",
  "price": 199.99,
  "quantity": 10
}
```

#### **Error Responses:**

- **400 Bad Request** (Invalid ID format):

```json
{
  "error": "Invalid product ID."
}
```

- **404 Not Found**:

```json
{
  "error": "Product not found."
}
```

---

## **3. Get Products by Category**

### **Endpoint:**

```
GET /api/products/category/:category
```

### **Response:**

#### **Success (200 OK):**

```json
{
  "products": [
    {
      "_id": "65a1234abcd5678",
      "name": "Product Name",
      "category": "Electronics",
      "price": 199.99,
      "quantity": 10
    }
  ]
}
```

---

## **4. Create a New Product (Admin Only)**

### **Endpoint:**

```
POST /api/products
```

### **Request Headers:**

| Key           | Value                   |
| ------------- | ----------------------- |
| Authorization | Bearer `your_jwt_token` |

### **Request Body:**

```json
{
  "name": "New Product",
  "category": "Books",
  "price": 49.99,
  "quantity": 15
}
```

### **Response:**

#### **Success (201 Created):**

```json
{
  "_id": "65a9876xyz",
  "name": "New Product",
  "category": "Books",
  "price": 49.99,
  "quantity": 15
}
```

#### **Error Responses:**

- **400 Bad Request** (Validation errors):

```json
{
  "error": "Validation Error",
  "details": [
    { "field": "name", "message": "Name is required" }
  ]
}
```

- **403 Forbidden** (Unauthorized):

```json
{
  "error": "Unauthorized - Admin access required"
}
```

---

## **5. Update Product (Admin Only)**

### **Endpoint:**

```
PUT /api/products/:id
```

### **Request Body:**

```json
{
  "name": "Updated Product",
  "price": 59.99
}
```

### **Response:**

#### **Success (200 OK):**

```json
{
  "message": "Product updated successfully.",
  "updatedProduct": {
    "_id": "65a1234abcd5678",
    "name": "Updated Product",
    "category": "Electronics",
    "price": 59.99,
    "quantity": 10
  }
}
```

#### **Error Responses:**

- **400 Bad Request** (Invalid ID or validation errors)
- **404 Not Found**

---

## **6. Delete Product (Admin Only)**

### **Endpoint:**

```
DELETE /api/products/:id
```

### **Response:**

#### **Success (200 OK):**

```json
{
  "message": "Product deleted successfully."
}
```

#### **Error Responses:**

- **400 Bad Request** (Invalid ID format)
- **404 Not Found**

---

## **Authentication & Authorization**

- `protectRoute`: Ensures only logged-in users can access certain routes.
- `adminRoute`: Ensures only admins can create, update, or delete products.
- Authentication is handled using **JWT tokens** sent in cookies.

---

## **Notes:**

- The API requires authentication for `POST`, `PUT`, and `DELETE` routes.
- Use Postman or an HTTP client to test these endpoints with proper headers.
- Sorting uses Mongoose `.sort()`, so `sort=-createdAt` means descending order.

🚀 **Now your API is well-documented!**

