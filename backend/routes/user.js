import express from "express";
import { list, read, remove, update, userById } from "../controllers/user";

const router = express.Router();

//Danh sách User
router.get("", list);
//Thông tin User
router.get("/:userId", read);
//Xoá User
router.delete("/:userId", remove);
//Sửa User
router.put("/:userId", update);
//Lấy param
router.param("userId", userById);

module.exports = router;
