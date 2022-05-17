const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");
const { protect, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const { hitCacheProductDetail, clearCacheProductDetail } = require("../middlewares/redis");

router
  .get("/", protect, productsController.getProducts)
  .get("/:id", protect, hitCacheProductDetail, productsController.detailProduct)
  .post("/", protect, isAdmin, upload.single("photo"), productsController.insertProducts)
  .put("/:id", protect, isAdmin, upload.single("photo"), clearCacheProductDetail, productsController.updateProducts)
  .delete("/:id", protect, isAdmin, clearCacheProductDetail, productsController.deleteProducts);

module.exports = router;
