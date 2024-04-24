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
router.get("", list);
//Chi tiết danh mục
router.get("/:categoryId", read);
//Thêm mới danh mục
router.post("", create);
//Cập nhật danh mục
router.put("/:categoryId", update);
//Xoá danh mục
router.delete("/:categoryId", remove);
//List Danh mục( ngoại trừ Danh mục hiện tại)
router.get("/related/:categoryId", listRelated);
//Lấy param
router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
