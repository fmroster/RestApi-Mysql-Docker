const express = require("express");
const postsController = require("../controllers/post.controller");
const checkAuthMiddleware = require('../middleware/check-auth')
const router = express.Router();

router.get("/", postsController.index);
router.get("/:id", postsController.show);

router.post("/", checkAuthMiddleware.checkAuth, postsController.save);
router.delete("/remove/:id", checkAuthMiddleware.checkAuth, postsController.remove);
router.patch("/update/:id", checkAuthMiddleware.checkAuth, postsController.modify);

module.exports = router;
