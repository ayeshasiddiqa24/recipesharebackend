const db = require("../models");
const Recipe = db.recipe;

// Create a recipe
exports.create = async (req, res) => {
  try {
    const { title, description, image_url } = req.body;

    const recipe = await Recipe.create({
      user_id: req.userId,
      title,
      description,
      image_url
    });

    res.status(201).json({ message: "Recipe created", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all recipes
exports.findAll = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: ["user"],
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recipes of the logged-in user
exports.findMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: { user_id: req.userId },
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single recipe by ID
exports.findOne = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a recipe
exports.update = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe || recipe.user_id !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, description, image_url } = req.body;

    await recipe.update({ title, description, image_url });

    res.status(200).json({ message: "Recipe updated", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a recipe
exports.delete = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe || recipe.user_id !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await recipe.destroy();

    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createWithImage = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, description } = req.body;
    const image_url = req.file?.location;

    const recipe = await Recipe.create({
      user_id: req.userId,
      title,
      description,
      image_url
    });

    res.status(201).json({ message: "Recipe created with image", recipe });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
};
