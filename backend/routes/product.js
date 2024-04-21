import express from "express";
import {
  list,
  read,
  create,
  update,
  remove,
  productById,
  productByCategory,
  relateProduct,
  search,
  filterPrice,
  sortPrice,
} from "../controllers/product";
import { categoryById } from "../controllers/category";
import { userById } from "../controllers/user";

const router = express.Router();
//Tìm kiếm sản phẩm
router.get("/products/search", search);
//Lọc theo giá
router.get("/products/filterPrice", filterPrice);
//Sắp xếp theo giá
router.get("/products/sortPrice", sortPrice);
//Danh sách sản phẩm
router.get("/products", list);
//Danh sách sản phẩm theo danh mục
router.get("/products/categories/:categoryId", productByCategory);
//Sản phẩm liên quan
router.get("/products/related/:productId", relateProduct);
//Chi tiết sản phẩm
router.get("/products/:productId", read);
//Thêm mới sản phẩm
router.post("/products", create);
//Cập nhật sản phẩm
router.put("/products/:productId", update);
//Xoá sản phẩm
router.delete("/products/:productId", remove);

//Lấy param
router.param("categoryId", categoryById);
router.param("productId", productById);
router.param("userId", userById);

module.exports = router;
