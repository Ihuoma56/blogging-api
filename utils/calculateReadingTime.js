module.exports = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
  };
  