import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";

export const create = (req, res) => {
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  // form.parse(req, (err, fields, files) => {
  //     if (err) {
  //         return res.status(400).json({
  //             error: "Add product failed"
  //         })
  //     }
  //     const { name, description, price } = fields;
  //     if (!name || !description || !price) {
  //         return res.status(404).json({
  //             error: "Bạn cần nhập đầy đủ thông tin!"
  //         })
  //     }
  //     let product = new Product(fields);
  //     if (files.photo) {
  //         if (files.photo.size > 2000000) {
  //             res.status(404).json({
  //                 error: "Ảnh quá nặng, upload ảnh dưới 1 MB"
  //             })
  //         }
  //         product.photo.data = fs.readFileSync(files.photo.path);
  //         product.photo.contentType = files.photo.type;
  //     }
  //     product.save((err, data) => {
  //         if (err) {
  //             return res.status(400).json({
  //                 error: "Add product failed"
  //             });
  //         }
  //         res.json(data);
  //     })
  // });

  const product = new Product(req.body);
  console.log(product);
  product.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Add product failed",
      });
    }
    res.json(data);
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
          error: "Không tìm thấy sản phẩm!",
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
        error: "Không xoá được sản phẩm!",
      });
    }
    res.json({
      data,
      message: "Xoá sản phẩm thành công",
    });
  });
};
export const update = (req, res) => {
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  // form.parse(req, (err, fields) => {
  //     console.log(req);
  //     console.log('Fields',fields);
  //     if (err) {
  //         return res.status(400).json({
  //             error: "Update product failed"
  //         })
  //     }
  //     const { name, description, price } = fields;
  //     if (!name || !description || !price) {
  //         return res.status(404).json({
  //             error: "Bạn cần nhập đầy đủ thông tin!"
  //         })
  //     }
  //     // let product = new Product(fields);
  //     let product = req.product;
  //         product = _.assignIn(product, fields)
  //     product.save((err, data) => {
  //         if (err) {
  //             return res.status(400).json({
  //                 error: "Update product failed"
  //             });
  //         }
  //         res.json(data);
  //     })
  // });
  let product = req.product;
  console.log(product);
  product = _.assignIn(product, req.body);
  console.log(product);
  product.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Cập nhật sản phẩm không thành công!",
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
  let name_like = req.query.name_like ? req.query.name_like : "";
  // console.log(name_like);
  Product.find({
    name: { $regex: `${name_like}`, $options: "$i" },
  }).exec((err, products) => {
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
