const auth = require("../middleware/auth.middleware");
const upload = require("../utils/s3Uploader");

module.exports = (app) => {
  const recipe = require("../controllers/recipe.controller");
  const router = require("express").Router();

  // ✅ Important: use multer in the route here
  router.post("/", auth, upload.single("image"), recipe.createWithImage);

  router.get("/", recipe.findAll);
  router.get("/me", auth, recipe.findMyRecipes);
  router.get("/:id", recipe.findOne);
  router.put("/:id", auth, recipe.update);
  router.delete("/:id", auth, recipe.delete);

  app.use("/api/recipes", router);
};
