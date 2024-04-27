import _ from "lodash";
import Product from "../models/product";

export const create = (req, res) => {
  const product = new Product(req.body);
  console.log(product);
  product.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Adding products failed",
      });
    }

    Product.findById(data._id)
      .populate("category")
      .exec((err, productWithCategory) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to get added product information",
          });
        }

        res.json(productWithCategory);
      });
  });
};

export const list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? +req.query.limit : 6;

  Product.find()
    // .select("-image")
    .populate("category")
    // .sort([[order, sortBy]])
    // .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Product not found",
        });
      }
      res.json(data);
    });
};

export const productById = (req, res, next, id) => {
  Product.findById(id)
    // .populate('category', '_id name')
    .exec((err, product) => {
      if (err || !product) {
        res.status(404).json({
          error: "No products found!",
        });
      }
      req.product = product;
      next();
    });
};

export const read = (req, res) => {
  return res.json(req.product);
};

export const remove = (req, res) => {
  let product = req.product;
  product.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "The product cannot be deleted!",
      });
    }
    res.json({
      data,
      message: "Product deletion successful",
    });
  });
};

export const update = (req, res) => {
  let product = req.product;
  console.log(product);
  product = _.assignIn(product, req.body);
  console.log(product);
  product.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Product update failed!",
      });
    }
    res.json(data);
  });
};

export const productByCategory = (req, res) => {
  console.log(req.category);
  Product.find({ category: req.category._id }, (err, products) => {
    if (err) {
      res.status(400).json({
        error: "Products not found",
      });
    }
    products.photo = undefined;
    res.json(products);
  });
};

export const relateProduct = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 3;

  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  }) // $ne: not include
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

export const search = (req, res) => {
  let name_like = req.query.name_like || "";

  const query = { name: { $regex: name_like, $options: "i" } };

  Product.find(query).exec((err, products) => {
    if (err) {
      res.status(400).json({
        error: "Product not found",
      });
    }
    res.json(products);
  });
};

export const filterPrice = (req, res) => {
  let price1 = req.query.price1 ? req.query.price1 : "";
  let price2 = req.query.price2 ? req.query.price2 : "";
  Product.find({
    $and: [{ priceSale: { $gte: price1 } }, { priceSale: { $lte: price2 } }],
  })
    .sort({
      priceSale: 1,
    })
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Product not found",
        });
      }
      res.json(products);
    });
};

export const sortPrice = (req, res) => {
  let level = req.query.level ? req.query.level : "";
  Product.find()
    .sort({
      priceSale: level,
    })
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Failed",
        });
      }
      res.json(products);
    });
};
