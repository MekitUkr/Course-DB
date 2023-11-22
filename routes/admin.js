const path = require('path')

const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

router.get('/products', adminController.getProducts)

router.get('/suppliers', adminController.getSuppliers)

router.get('/edit-supplier/:supplierId', adminController.getEditSupplier)

router.get('/add-supplier', adminController.getAddSupplier)

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct)

router.post('/add-supplier', adminController.postAddSupplier)

router.post('/edit-supplier', adminController.postEditSupplier)

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)

router.post('/delete-supplier', adminController.postDeleteSupplier)

module.exports = router
