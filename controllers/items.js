const { SchemaTypeOptions } = require('mongoose');
const Item = require('../models/item');

module.exports.allItems = async(req, res) => {
    const items = await Item.find({});
    res.render('items/allItems', {items});
}
module.exports.createItem = async (req, res) => {
    const item = new Item({
        title: 'Test item',
        category: 'Sneakers',
        dateBought: new Date(),
        cost: 99.99,
        ifSold: false
    });
    await item.save();
    res.send(item);
}

module.exports.detailsItem //TODO
module.exports.updateItem //TODO
module.exports.deleteItem //TODO
module.exports.editItemForm //TODO
