const { MongooseError } = require("mongoose");
const Menu = require("../models/Menu");
const Dish = require("../models/Dish");

async function search(req, res) {
  if (!req.query.keyword) {
    return res.status(400).json({ error: "Missing keyword" });
  }
  try {
    const result = await Menu.find({
      title: { $regex: `.*${req.query.keyword}.*` },
    })
      .skip(req.query.offset ?? 0)
      .limit(req.query.limit)
      .select({
        title: 1,
        subtitle: 1,
        gallery: 1,
        reviewStar: 1,
        reviewCount: 1,
      })
      .exec();
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof MongooseError) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.status(500).json({ error: e.message });
  }
}

async function getMenu(req, res) {
  if (!req.params.id) return res.status(400).json({ error: "Required id" });
  try {
    const menu = await Menu.findById(req.params.id);
    return res.status(200).json(menu);
  } catch (e) {
    if (e instanceof MongooseError)
      return res.status(404).json({ error: "Not Found" });
    return res.status(500).json({ message: e.message });
  }
}

async function addDish(req, res) {
  if (!req.body) return res.status(400).json({ message: "Bad Request" });
  try {
    const dish = await new Dish({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    });
    await dish.save();
  } catch (err) {
    if (err instanceof MongooseError)
      return res.status(400).json({ message: err.message });
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { search, getMenu, addDish};
