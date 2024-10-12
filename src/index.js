const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const Blog = mongoose.model('Blog', new mongoose.Schema({
    title: String,
    content: String,
    location: String,
    userId: String,
  }));

  const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    location: String,
    userId: String,
  });
  
  app.get('/api/blogs', async (req, res) => {
    const { location } = req.query;
    const blogs = await Blog.find({ location });
    res.json(blogs);
  });
  
  app.post('/api/blogs', async (req, res) => {
    const { title, content, location, userId } = req.body;
    const blog = new Blog({ title, content, location, userId });
    await blog.save();
    res.status(201).json(blog);
  });
  

app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });