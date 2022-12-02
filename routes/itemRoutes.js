const express = require("express");
const router = express.Router();
const items = require('../controllers/items');
const catchAsync = require("../utilities/catchAsync");
const { validateItem, isLoggedIn } = require('../middleware');

const Item = require('../models/item');

router.route('/')
    .get(isLoggedIn, catchAsync(items.allItems)) //index all items
    .post(isLoggedIn, validateItem, catchAsync(items.createItem)); // create item

router.route('/create').get(isLoggedIn, items.createItemForm); //form to create item


router.route('/:id')
    .get(isLoggedIn, items.detailsItem)
    .patch(isLoggedIn, validateItem, catchAsync(items.updateItem))
    .delete(isLoggedIn, catchAsync(items.deleteItem));

router.route('/:id/edit')
    .get(isLoggedIn, catchAsync(items.editItemForm));

module.exports = router;