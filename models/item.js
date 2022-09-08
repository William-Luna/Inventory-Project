const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Item:

Title - string, required
Category - string, required
Date bought - date, required
Cost - number, required
If sold - boolean, required
Date sold - date
Price sold - number
Fees - number

*/

const ItemSchema = new Schema ({
    title: String,
    category: String,
    dateBought: Date,
    cost: Number,
    ifSold: Boolean,
    dateSold: Date,
    return: Number,
    fees: Number
})