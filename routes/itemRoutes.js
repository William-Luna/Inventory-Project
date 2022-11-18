const express = require("express");
const router = express.Router();
const items = require('../controllers/items');
const catchAsync = require("../utilities/catchAsync");
const { validateItem } = require('../middleware');

const Item = require('../models/item');

router.route('/')
    .get(catchAsync(items.allItems)) //index all items
    .post(validateItem, catchAsync(items.createItem)); // create item

router.route('/create').get(items.createItemForm); //form to create item


router.route('/:id')
    .get(items.detailsItem)
    .patch(validateItem, catchAsync(items.updateItem))
    .delete(catchAsync(items.deleteItem));

router.route('/:id/edit')
    .get(catchAsync(items.editItemForm));

module.exports = router;