import User from "../models/user";

export const list = (req, res) => {
  User.find().exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: "User not found",
      });
    }
    res.json(data);
  });
};
export const userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};
export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
export const remove = (req, res) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: "User not found!",
      });
    }
    res.json({
      deletedUser,
      message: "Deleted successfully",
    });
  });
};

export const update = (req, res) => {
  console.log(req);
  User.findOneAndUpdate({ _id: req.profile.id }, { $set: req.body }, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform in action",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};
