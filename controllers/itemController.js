const Item = require('../models/item');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator')

exports.item_list = asyncHandler(async (req, res, next) => {
    res.send('item_list not implemented');
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec();

    res.render('item_detail', {
        item: item,
    });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.render('item_form', { title: 'Add item' })
});

exports.item_create_post = [
    body('itemName')
        .trim()
        .isLength({min: 2})
        .trim()
        .withMessage('Item name must be at least 2 characters long')
        .isAlphanumeric()
        .withMessage('Item name has non-alphanumeric characters.'),
    body('itemDesc')
        .trim()
        .isLength({min: 5})
        .trim()
        .withMessage('Item description must be at least 5 characters long')
        .isAlphanumeric()
        .withMessage('Item description has non-alphanumeric characters.'),
    body('itemPrice')
        .isFloat({min: 0})
        .withMessage('Item price must be a positive decimal number'),
    body('itemAmountInStock')
        .isInt({min: 0})
        .withMessage('Item amount-in-stock must be a positive integer'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            name: req.body.itemName,
            description: req.body.itemDesc,
            category: req.body.itemCategory,
            price: req.body.itemPrice,
            amount_in_stock: req.body.itemAmountInStock
        });

        if (!errors.isEmpty()){
            res.render('item_form', {
                title: 'Add item',
                item: item,
                errors: errors.array()
            });
            return;
        } else {
            await item.save();
            res.redirect(item.url)
        }
    }
)];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send('item_delete_get not iplemented');
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send('item_delete_post not iplemented');
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send('item_update_get not iplemented');
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send('item_update_post not iplemented');
});