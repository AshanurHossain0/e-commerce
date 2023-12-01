# e-commerce

## Steps to run project
### git clone "https://github.com/AshanurHossain0/e-commerce.git"
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
