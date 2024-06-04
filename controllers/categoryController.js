const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('expess-validator');

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
    res.render('category_form', {title: 'Add a new Category'});
});

exports.category_create_post = [
    body('name')
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('Category name must be specified.')
        .isAlphanumeric()
        .withMessage('Category name has non-alphanumeric characters.'),
    body('description')
        .trim()
        .isLength(10)
        .escape()
        .withMessage('Description must be 10+ characters long'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name, 
            description: req.body.description});
        
        if (!errors.isEmpty()){
            res.render('category_form', {
                title: 'Add a new Category',
                category: category,
                errors: errors.array(),
            });
        } else {
            const categoryExists = await Category.findOne({name: req.body.name})
                .collation({ locale: "en", strength: 2 })
                .exec();

            if (categoryExists){
                res.redirect(categoryExists.url);
            } else {
                await Category.save();
                res.redirect(category.url);
            }
        }
    }
)];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
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