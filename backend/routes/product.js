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
router.get("/search", search);
//Lọc theo giá
router.get("/filterPrice", filterPrice);
//Sắp xếp theo giá
router.get("/sortPrice", sortPrice);
//Danh sách sản phẩm
router.get("", list);
//Danh sách sản phẩm theo danh mục
router.get("/categories/:categoryId", productByCategory);
//Sản phẩm liên quan
router.get("/related/:productId", relateProduct);
//Chi tiết sản phẩm
router.get("/:productId", read);
//Thêm mới sản phẩm
router.post("", create);
//Cập nhật sản phẩm
router.put("/:productId", update);
//Xoá sản phẩm
router.delete("/:productId", remove);

//Lấy param
router.param("categoryId", categoryById);
router.param("productId", productById);
router.param("userId", userById);

module.exports = router;
