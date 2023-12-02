# e-commerce

## Steps to run project
### git clone "https://github.com/AshanurHossain0/e-commerce.git"
### cd e-commerce
### npm install
### npm start

## Routes
### User Route
#### User registration
- http://localhost:3000/user/register
- method : POST
- request body
  ```yaml
  {
    "fullName":"Rohit Sharma",
    "email":"rohit@gmail.com",
    "phone":"9234567890",
    "password":"1234@",
    "address":{"street":"ramanujan-road","city":"Siliguri","landmark":"IDFC Bank","pincode":736133}
  }
  ```

#### User login
- http://localhost:3000/user/login
- method : POST
- request body
  ```yaml
  {
    "email":"rohit@gmail.com",
    "password":"1234@"
  }
  ```
### Product Route
#### Add Product
- http://localhost:3000/product
- method : POST
- request body
  ```yaml
  {
    "title":"vidyut-fashion-shoe",
    "description":"excellent shoes for party,picnic",
    "category":"shoe",
    "rating":4.7,
    "price":850,
    "availableColor":["green","yellow","black","white"],
    "availableQuantity": 25
  }
  ```
#### a) Category Listing
- http://localhost:3000/product/categories
- method : GET
#### b) Product Listing
- http://localhost:3000/product
- method : GET
#### c) Product Details
- http://localhost:3000/product/<product_id>
- method : GET
  
### d) Cart Management Route
#### Add product to cart
- http://localhost:3000/cart/<product_id>
- method : POST
- After login the received token must be provided in Bearer Token in request header's authorization key
- Request body
  ```yaml
    {
      "quantity":3
    }
  ```
#### View the cart
- http://localhost:3000/cart
- method : GET
- After login the received token must be provided in Bearer Token in request header's authorization key

#### Update product quantity in cart
- http://localhost:3000/cart/<product_id>
- method : PUT
- After login the received token must be provided in Bearer Token in request header's authorization key
- Request body
  ```yaml
    {
      "quantity":3
    }
  ```

#### Remove item from cart
- http://localhost:3000/cart/remove/<product_id>
- method : PUT
- After login the received token must be provided in Bearer Token in request header's authorization key

### Order Related
#### Order Placement
- http://localhost:3000/order
- method : POST
- After login the received token must be provided in Bearer Token in request header's authorization key

#### Get Order Details
- http://localhost:3000/order/<order_id>
- method : GET
- After login the received token must be provided in Bearer Token in request header's authorization key

#### Get Order History of an User
- http://localhost:3000/user/orders
- method : GET
- After login the received token must be provided in Bearer Token in request header's authorization key