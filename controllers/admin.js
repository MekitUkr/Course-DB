const Product = require('../models/product')
const Supplier = require('../models/supplier')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = async (req, res, next) => {
  const { name, description, price, quantity, imageUrl, supplier } = req.body
  const supplierInfo = await Supplier.findOne({ where: { name: supplier } })
  Product
  .create({
    name,
    description, 
    price,
    quantity,
    imageUrl,
    supplierId: supplierInfo.id
  }) // создаться продукт автоматически связаный с этим пользователем по userId
    .then(result => {
      console.log('Created Product')
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  const product = await Product.findOne({ where: { id: prodId } })
  const supplier = await Supplier.findByPk(product.supplierId)
  product.supplier = supplier.name
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle
      product.price = updatedPrice
      product.description = updatedDesc
      product.imageUrl = updatedImageUrl
      return product.save()
    })
    .then(result => {
      console.log('UPDATED PRODUCT!!!')
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Manage Products',
        path: '/admin/products'
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      console.log('PRODUCT DELETED')
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getSuppliers = (req, res, next) => {
  Supplier.findAll()
    .then(suppliers => {
      res.render('admin/suppliers', {
        suppliers: suppliers,
        pageTitle: 'Suppliers',
        path: '/admin/suppliers'
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getAddSupplier = (req, res, next) => {
  res.render('admin/edit-supplier', {
    pageTitle: 'Add Supplier',
    path: '/admin/add-supplier',
    editing: false
  })
}

exports.getEditSupplier = async (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const supplierId = req.params.supplierId
  const supplier = await Supplier.findByPk(supplierId)
  const supplierProds = await Product.findAll({ where: { supplierId } })
  supplier.products = supplierProds
  res.render('admin/edit-supplier', {
    pageTitle: 'Edit Supplier',
    path: '/admin/edit-supplier',
    editing: editMode,
    supplier
  })
}

exports.postAddSupplier = (req, res, next) => {
  const { name, contactInfo } = req.body
  Supplier.create({
    name,
    contactInfo
  })
    .then(result => {
      console.log('Created Supplier')
      res.redirect('/admin/suppliers')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postEditSupplier = (req, res, next) => {
  const supplierId = req.body.supplierId
  const updatedName = req.body.name
  const updateContactInfo = req.body.contactInfo
  Supplier.findByPk(supplierId)
    .then(supplier => {
      supplier.name = updatedName
      supplier.contactInfo = updateContactInfo
      return supplier.save()
    })
    .then(result => {
      res.redirect('/admin/suppliers')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postDeleteSupplier = (req, res, next) => {
  const supplierId = req.body.supplierId
  Supplier.findByPk(supplierId)
    .then(supplier => {
      return supplier.destroy()
    })
    .then(result => {
      res.redirect('/admin/suppliers')
    })
    .catch(err => {
      console.log(err)
    })
}