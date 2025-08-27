const express = require("express");
const userSignupController = require("../controller/users/userSignup.js");
const userSigninController = require("../controller/users/userSignin.js");
const authToken = require("../middleware/authToken.js");
const userDetailsController = require("../controller/users/userDetails.js");
const userLogout = require("../controller/users/userLogout.js");
const allUsers = require("../controller/users/allUsers.js");
const updateUserController = require("../controller/users/updateUser.js");
const addCategoryController = require("../controller/inventory/addCategory.js");
const allCategoryController = require("../controller/inventory/allCategory.js");
const getProductsByCategory = require("../controller/inventory/getProductByCategory.js");
const addProductController = require("../controller/inventory/addProduct.js");
const updateCategoryController = require("../controller/inventory/updateCategory.js");
const updateProductController = require("../controller/inventory/updateProduct.js");
const DeleteController = require("../controller/deleteController.js");

const router = express.Router();
//and go to front > Common > and put the endpoint
router.post("/register", userSignupController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUserController);

//Category
router.post("/add-category", authToken, addCategoryController);
router.get("/all-category", authToken, allCategoryController);
router.get("/category/:slug", authToken, getProductsByCategory);
router.post("/add-product", authToken, addProductController);
router.post("/update-category", authToken, updateCategoryController);
router.post("/update-product", authToken, updateProductController);

//delete
const deleteUserController = new DeleteController("users");
const deleteCategoryController = new DeleteController("categories");
const deleteProductController = new DeleteController("products");

router.delete("/delete-user/:id", authToken, deleteUserController.deleteById);
router.delete(
  "/delete-category/:id",
  authToken,
  deleteCategoryController.deleteById
);
router.delete(
  "/delete-product/:id",
  authToken,
  deleteProductController.deleteById
);

module.exports = router;
