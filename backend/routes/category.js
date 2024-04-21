import express from "express";
import {
  categoryById,
  create,
  list,
  listRelated,
  read,
  remove,
  update,
} from "../controllers/category";
import { userById } from "../controllers/user";

const router = express.Router();

//Danh sách danh mục
router.get("/categories", list);
//Chi tiết danh mục
router.get("/categories/:categoryId", read);
//Thêm mới danh mục
router.post("/categories", create);
//Cập nhật danh mục
router.put("/categories/:categoryId", update);
//Xoá danh mục
router.delete("/categories/:categoryId", remove);
//List Danh mục( ngoại trừ Danh mục hiện tại)
router.get("/categories/related/:categoryId", listRelated);
//Lấy param
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
