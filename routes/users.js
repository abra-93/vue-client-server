const { Router } = require("express");
const router = Router();
const users = require("../controllers/users");

router.post("/user", users.me);

module.exports = router;
