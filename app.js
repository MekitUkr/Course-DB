const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product')
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const Supplier = require('./models/supplier');
const Customer = require('./models/customer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  Customer.findByPk(1)
    .then(customer => {
      req.customer = customer
      next()  
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Supplier.hasMany(Product)

Customer.hasOne(Cart)

Cart.belongsToMany(Product, {
  through: CartItem
})
Product.belongsToMany(Cart, {
  through: CartItem
})

Customer.hasMany(Order)

Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })
sequelize
  .sync()
  .then(result => {
    return Customer.findByPk(1)
  })
  .then(customer => {
    if(!customer) {
      return Customer.create({
        name: 'Max',
        address: 'Kyiv',
        email: 'test@test.com',
        phone: '+38(099)-999-99-99'
      })
    }
    return customer;
  })
  .then(customer => {
    return customer.createCart()
  })
  .then(cart => {
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })
