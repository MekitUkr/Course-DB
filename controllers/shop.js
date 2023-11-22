const Product = require('../models/product')
const Supplier = require('../models/supplier')

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId
  const product = await Product.findByPk(prodId)
  const supplier = await Supplier.findByPk(product.supplierId)
  product.supplier = supplier
  res.render('shop/product-detail', {
    product,
    pageTitle: product.title,
    path: '/products'
  })
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getCart = (req, res, next) => {
  req.customer.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId
  let newQuantity = 1
  const fetchedCart = await req.customer.getCart()
  const products = await fetchedCart.getProducts({ where: { id: prodId } })
  let product
  if(products.length > 0){
    product = products[0] 
  }
  if(product) {
    const oldQuantity = product.cartItem.quantity
    newQuantity = oldQuantity + 1
  }
  return Product.findByPk(prodId)
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: {quantity: newQuantity}
      })
    })
    .catch(err => console.log(err))
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  req.customer.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req,res,next) => {
  let fetchedCart
  req.customer.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then(products => {
      req.customer.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity }
            return product
          }))
        })
        .catch(err => console.log(err))
    })
    .then(result => {
      return fetchedCart.setProducts(null)
    })
    .then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.customer.getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
      })
    })
    .catch(err => console.log(err))
}
