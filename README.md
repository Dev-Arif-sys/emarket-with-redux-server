#  Emarket -An Ecommerce Website

to visit the live site  [click here](https://emarket-u.netlify.app/).
 
 Technology used: React js, Bootstrap,Redux, React-router-hook-form, Firebase login, Nodejs, express js, MongoDb.
## feature description 

 * This is an ecommerce site . it has multiple  types of product section
Home page consists of Bigger Header, Hero with Slider, Products showing,Product with category , Ad of Product  Subscription and a footer section.

 * The second header includes home, shop , contact and your order or dashboard link.

* Products section in the home page has the types of button to filter top rated and best seller products.

 * Product cards have a product's picture and details with two buttons for add to cart and add to favorite which is not functionable.

* Products with a category section  have buttons to filter the particular types of product.

* After clicking on a particular product it will take you to the details of the product if you are logged in. but if you are not , a pop-up will appear for logging in.

* The includes firebase log-in system for google, github and email-password
 The product details page has details about the product and here you can increase the product quantity and add to the cart . it also includes a slider in the below with the same types of products.
* In the header , there is a cart sign which takes you to the cart page. It includes all the cart’s products and the price of all the products. For retention of the cart product , localStorage is used here. Here you can change the quantity of cart products and the price will change with the quantity.

* In the cart page, Proceed to check out button takes you to the billing page but the billing is not added yet. If you provide the information and order . the order will be listed in the database.

* You can see your order in the order page .

* For admin here we added a dashboard which includes manage order, add a product, make admin  and manage all products sections.
* For protecting dashboard adminRoute is used.
* Shop page includes all products . You can filter them according to the category of the product and can add the product to the cart.
