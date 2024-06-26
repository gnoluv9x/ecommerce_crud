import Category from "../models/category";

export const create = (req, res) => {
  console.log(req.body);
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Add Category failed!",
      });
    }
    res.json(data);
  });
};
export const list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Product not found",
      });
    }
    res.json(data);
  });
};
export const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(404).json({
        error: "No product categories found!",
      });
    }
    req.category = category;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.category);
};
export const remove = (req, res) => {
  let category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to delete directory!",
      });
    }
    res.json({
      data,
      message: "Directory deleted successfully",
    });
  });
};
export const update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Category update failed",
      });
    }
    res.json(data);
  });
};
export const listRelated = (req, res) => {
  Category.find({
    _id: { $ne: req.category },
  }).exec((err, category) => {
    if (err) {
      res.status(400).json({
        error: "Products not found",
      });
    }
    res.json(category);
  });
};
