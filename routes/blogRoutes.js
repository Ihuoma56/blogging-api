const express = require('express');
const { createBlog, getBlogs, getBlog, updateBlogState, editBlog, deleteBlog } = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);

router.use(authMiddleware); // Protect following routes

router.post('/', createBlog);
router.put('/:id/state', updateBlogState);
router.put('/:id', editBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
