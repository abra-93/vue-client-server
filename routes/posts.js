const { Router } = require("express");
const router = Router();
const posts = require("../controllers/posts");

const upload = require("../service/uploadfile");

router.get("/", posts.getAll);

router.post("/create", upload.any(), posts.create);

router.put("/like", posts.likes);

module.exports = router;
