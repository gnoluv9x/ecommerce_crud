import express from "express";
import { list, read, remove, update, userById } from "../controllers/user";

const router = express.Router();

//Danh sách User
router.get("/users", list);
//Thông tin User
router.get("/users/:userId", read);
//Xoá User
router.delete("/users/:userId", remove);
//Sửa User
router.put("/users/:userId", update);
//Lấy param
router.param("userId", userById);

module.exports = router;
