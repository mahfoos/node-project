const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const rateLimit = require("../middleware/rateLimit");

router.use(auth);
router.use(rateLimit);

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/:id/price", productController.repriceProduct);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
