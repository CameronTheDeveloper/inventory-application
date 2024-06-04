const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('index page not implemented');
});

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();
    res.render('category_list', {
        title: "Categories",
        category_list: allCategories
    })
});

exports.category_items = asyncHandler(async (req, res, next) => {
    const [category, allItemsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category: req.params.id}).exec(),
    ]);

    res.render('category_items', {
        category: category,
        item_list: allItemsInCategory
    });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send('category_create_get not iplemented');
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send('category_create_post not iplemented');
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send('category_delete_get not iplemented');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send('category_delete_post not iplemented');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send('category_update_get not iplemented');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send('category_update_post not iplemented');
});