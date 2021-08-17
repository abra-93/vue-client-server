const { posts, users, likes } = require("../model/index");

const user = require("./users");

module.exports = {
  // Создание поста
  async create(req, res) {
    let avatar = "",
      images = [];

    req.files.forEach((elem) => {
      if (elem.fieldname === "avatar") {
        avatar = elem.filename;
      } else if (elem.fieldname === "images") {
        images.push(elem.filename);
      }
    });
    try {
      const post = new posts({
        _id: req.body.id,
        avatar: avatar,
        title: req.body.title,
        body: req.body.body,
        images: images,
      });
      await post.save();
      return res
        .status(200)
        .json({ id: post.id, text: "Пост добавлен", color: "green" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Пост не добавлен" });
    }
  },
  // Получение всех постов
  async getAll(req, res) {
    try {
      const postData = await posts.find({});
      return res.status(200).send(postData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Что то пошло не так" });
    }
  },
  // Отслеживание Лайков
  async likes(req, res) {
    const { postId, userId } = req.body;
    try {
      const userLikes = await posts.findOne({
        _id: postId,
        likes: { $in: userId },
      });

      // // Добавляем лайк к посту
      await posts.updateOne({ _id: postId }, { $addToSet: { likes: userId } });

      if (userLikes) {
        await posts.updateOne({ _id: postId }, { $pull: { likes: userId } });
        return res.status(200).send(false);
      }
      // console.log(userLikes);

      return res.status(200).send(true);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Что то пошло не так" });
    }
  },
};
