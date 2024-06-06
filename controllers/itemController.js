const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

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
    res.render('item_form', { title: 'Add items' })
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send('item_create_post not iplemented');
});

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