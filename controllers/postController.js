require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, Users, Category } = require('../models');
// const Users = require('../models/Users');

const { JWT_SECRET } = process.env;

const createPost = async (req, res, _next) => {
    try {
 const { title, content, categoryIds } = req.body;
      const token = req.headers.authorization;
      const jwtVerification = jwt.verify(token, JWT_SECRET);
      const email = jwtVerification.data;
      // console.log(email);
      const findId = await Users.findOne({ where: { email } });
      // console.log('testando findddddddddd', findId);
      const userId = findId.dataValues.id;
      // console.log(userId);
      console.log(await findId.getUserId());
      const newPost = await BlogPost.create({ title, content, userId });
      
      const createPostCategory = categoryIds
      .map((id) => PostCategory.create({ postId: newPost.id, categoryId: id }));
      await Promise.all(createPostCategory);
      return res.status(201).json(newPost);
    } catch (e) {
      return res.status(404).json(e);
    }
  };

  const getAllPosts = async (req, res, _next) => {
      try {
        const posts = await BlogPost.findAll({
          include: [
            { model: Users, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
          ],
        });
        console.log(posts);
        return res.status(200).json(posts);
      } catch (e) {
        return res.status(400).json(e);
      }
    };
  
  module.exports = {
      createPost,
      getAllPosts,
  };