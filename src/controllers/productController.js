const Product = require("../models/product");
const externalApi = require("../services/externalApi");
const cache = require("../services/cache");

async function getProducts(req, res) {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Product.countDocuments(query);

    return res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;

    const cacheData = await cache.get(cacheKey);
    if (cacheData) {
      return res.json(cacheData);
    }

    const [externalData, internalData] = await Promise.all([
      externalApi.getProduct(id),
      Product.findById(id),
    ]);

    if (!externalData && !internalData) {
      return res.status(404).json({ message: "Product not found" });
    }

    const combinedData = { ...externalData, ...internalData };

    await cache.set(cacheKey, combinedData, 60);

    return res.json(combinedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createProduct(req, res) {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function repriceProduct(req, res) {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    const product = await Product.findByIdAndUpdate(
      { productId: id },
      { price, updateAt: Date.now() },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await cache.invalidate(`product:${id}`);

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  repriceProduct,
};
