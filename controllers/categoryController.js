const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', {
        title: 'Shop Inventory Application',
        categoryListURL: '/catalog/categories'
    });
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
    body('category_name')
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('Category name must be specified.')
        .isAlphanumeric()
        .withMessage('Category name has non-alphanumeric characters.'),
    body('category_desc')
        .trim()
        .isLength(10)
        .escape()
        .withMessage('Description must be 10+ characters long'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.category_name, 
            description: req.body.category_desc});
        
        if (!errors.isEmpty()){
            res.render('category_form', {
                title: 'Add a new Category',
                category: category,
                errors: errors.array(),
            });
        } else {
            const categoryExists = await Category.findOne({name: req.body.category_name})
                .collation({ locale: "en", strength: 2 })
                .exec();

            if (categoryExists){
                res.redirect(categoryExists.url);
            } else {
                await category.save();
                res.redirect(category.url);
            }
        }
    }
)];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const [category, allItemsInCategory] = await Promise.all ([
        Category.findById(req.params.id).exec(),
        Item.find({category: req.params.id}, 'name').exec()
    ]);

    if (category === null){
        res.redirect('/catalog/categories');
    }

    res.render('category_delete', {
        title: 'Delete Category',
        category: category,
        items_list: allItemsInCategory,
    });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const [category, allItemsInCategory] = await Promise.all ([
        Category.findById(req.params.id).exec(),
        Item.find({category: req.params.id}, 'name').exec()
    ]);

    if (allItemsInCategory.length > 0){
        res.render('category_delete', {
            title: 'Delete Category',
            category: category,
            items_list: allItemsInCategory,
        });
        return;
    } else {
        await Category.findByIdAndDelete(req.body.categoryid);
        res.redirect('/catalog/categories');
    }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();

    res.render('category_form', {
        title: 'Update Category',
        category: category
    });
});

exports.category_update_post = [
    body('category_name')
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('Category name must be specified.')
        .isAlphanumeric()
    .withMessage('Category name has non-alphanumeric characters.'),
    body('category_desc')
        .trim()
        .isLength(10)
        .escape()
        .withMessage('Description must be 10+ characters long'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const category = new Category({
            name: req.body.category_name, 
            description: req.body.category_desc,
            _id: req.params.id
        });

        if (!errors.isEmpty()){
            res.render('category_form', {
                title: 'Update Category',
                category: category,
                errors: errors.array()
            });
        } else {
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {});
            res.redirect(updatedCategory.url);
        }
    }
)];