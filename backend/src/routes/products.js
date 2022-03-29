const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { Products, validate } = require("../models/products");
const imgUpload = require("./imgUpload");

const express = require("express");
const router = express.Router();

router.get("/All", async (req, res) => {
  const Prod = await Products.find().populate("prod_categories", "name");

  return res.send(Prod);
});

router.get("/:id", async (req, res) => {
  const Prod = await Products.findById(req.params.id).populate(
    "prod_categories",
    "name"
  );

  if (!Prod)
    return res.status(404).send("the product with the given ID was not found");

  res.send(Prod);
});
router.get("/ProdByPage/:Page", async (req, res) => {
  const pageNumber = req.params.Page;
  const pageSize = 6;
  const Prod = await Products.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate("prod_categories", "name");

  res.send(Prod);
});

router.post("/ProdByCat/:Page", async (req, res) => {
  const pageNumber = req.params.Page;
  const pageSize = 2;

  const prod = await Products.find({ prod_categories: req.body.cat })
    .sort({ _id: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate("prod_categories", "name");

  res.send(prod);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const prod = await Products.findByIdAndRemove(req.params.id, {
    useFindAndModify: false,
  });
  if (!prod)
    return res.status(404).send("The prod with given id was not found.");

  res.send(prod);
});

router.post("/", [auth, admin], imgUpload, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Products.findOne({ name: req.body.name });

  if (product) return res.status(400).send("products already registred");

  let Prod_Pic = "";
  if (req.file && req.file !== "") {
    const URL = req.protocol + "://" + req.get("host");
    Prod_Pic = URL + "/images/" + req.file.filename;
  } else {
    Prod_Pic = req.body.profile_img;
  }

  product = new Products(
    {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      product_img: Prod_Pic,
      prod_categories: req.body.prod_categories,
    },
    { new: true, useFindAndModify: false }
  );

  await product.save();

  return res.send(product);
});

router.put("/:id", [auth, admin], imgUpload, async (req, res) => {
  let Prod_Pic = "";
  if (req.file && req.file !== "") {
    const URL = req.protocol + "://" + req.get("host");
    Prod_Pic = URL + "/images/" + req.file.filename;
  } else {
    Prod_Pic = req.body.profile_img;
  }

  product = await Products.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      product_img: Prod_Pic,
      prod_categories: req.body.prod_categories,
    },
    { new: true, useFindAndModify: false }
  );

  if (!product)
    return res.status(404).send("this product is no longer here any more.");

  res.send(product);
});

module.exports = router;
