const { SchemaTypeOptions } = require('mongoose');
const Item = require('../models/item');


//GET /ITEMS CONTROL
module.exports.allItems = async(req, res) => {
    const items = await Item.find({});
    res.render('items/allItems', {items});
}

//POST /ITEMS CONTROL
module.exports.createItem = async (req, res) => {
    const item = req.body.item;

    const testItem = new Item({
        title: 'Test item',
        category: 'Sneakers',
        dateBought: new Date(),
        cost: 99.99,
        ifSold: false
    });
    await item.save();
    console.log(item);
    res.redirect(`/items`);
}

//GET /ITEMS/CREATE CONTROL
module.exports.createItemForm = (req,res) => {
    res.render('items/createForm');
}

//GET /ITEMS/$ID CONTROL
module.exports.detailsItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        console.log('Cannot display item details');
        return res.redirect('/items');
    }
    res.render('items/detailsItem', {item});
}

//GET /ITEMS/$ID/EDIT CONTROL
module.exports.editItemForm = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('items/editForm', {item});
}

//PATCH /ITEMS/$ID CONTROL
module.exports.updateItem = async (req, res) => {
    const {id} = req.params;
    const item = await Item.findByIdAndUpdate(id, {...req.body.item});
    await item.save();
    res.redirect(`/shops/${item._id}`);
}

//DELETE /ITEMS/$ID CONTROL
module.exports.deleteItem = async (req,res) => {
    const {id} = req.params;
    const item = await Item.findByIdAndDelete(id);
    res.redirect('/items');
}
