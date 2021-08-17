const { users } = require("../model/index");

module.exports = {
  async me(req, res) {
    const id = req.body.id;
    try {
      const user = await users.findById(id);
      console.log(id, user);
      if (!user) {
        const newUser = new users({
          _id: req.body.id,
          name: req.body.name,
        });
        await newUser.save();
      }
      return res
        .status(200)
        .json({ user: user.id, text: "Пользователь подключен" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  },
};
