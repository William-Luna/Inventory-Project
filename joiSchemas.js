/* Joi: Used for extensive validation of item if clientside validation is bypassed */
const { boolean } = require('joi');
const Joi = require('joi');

module.exports.itemSchema = Joi.object({
    item: Joi.object({
        title: Joi.string().required(),

        category: Joi.string().required(),

        //dateBought cannot be after current date
        dateBought: Joi.date().required().max('now'),

        //cost cannot be negative
        cost: Joi.number().required().min(0),

        ifSold: Joi.boolean().required(),

        //dateSold is only required if ifSold is true and must be undefined if false, 
        //and must be on or after dateBought
        dateSold: Joi.alternatives().conditional
            ('ifSold', {
                is: true,
                then: Joi.date().required().min(Joi.ref('dateBought')),
                otherwise: Joi.forbidden()
            }),

        //return "  ", cannot be negative    
        return: Joi.alternatives().conditional
            ('ifSold', {
                is: true,
                then: Joi.number().required().min(0),
                otherwise: Joi.forbidden()
            }),

        //fees "  ", cannot be negative
        fees: Joi.alternatives().conditional
            ('ifSold', {
                is: true,
                then: Joi.number().required().min(0),
                otherwise: Joi.forbidden()
            }),

    })
}
).required();