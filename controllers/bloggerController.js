const Blog = require('../models/blog');
const User = require('../models/user');

// Create Blog (in draft state)
exports.createBlog = async (req, res) => {
  try {
    const { title, description, body, tags } = req.body;
    const blog = new Blog({
      title,
      description,
      body,
      tags,
      author: req.user.id
    });
    
    blog.calculateReadingTime();
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog' });
  }
};

// Get Published Blogs (Paginated, Searchable, Sortable)
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, author, title, tags, sortBy = 'timestamp' } = req.query;
    const filter = { state: 'published' };

    if (author) {
      const user = await User.findOne({ first_name: author });
      if (user) filter.author = user._id;
    }

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (tags) filter.tags = { $in: tags.split(',') };

    const blogs = await Blog.find(filter)
      .sort({ [sortBy]: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .populate('author', 'first_name last_name email');

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};

// Get Single Blog (Increase Read Count)
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'first_name last_name email');
    
    if (!blog || blog.state !== 'published') {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.read_count += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog' });
  }
};

// Update Blog State (draft -> published)
exports.updateBlogState = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    blog.state = 'published';
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog state' });
  }
};

// Edit Blog
exports.editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, description, body, tags } = req.body;
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.body = body || blog.body;
    blog.tags = tags || blog.tags;
    blog.calculateReadingTime();

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error editing blog' });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog' });
  }
};
