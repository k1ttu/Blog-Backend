const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  date: {
    type: Date,
    default:Date.now
  },
  title: {
    type: String,
    require: true,
  },
  headings: [
    {
      index: Number,
      heading: String,
    },
  ],
  content: [
    {
      type: String,
    },
  ],
  coverPic:{
    type:String
  },
  images: [
    {
      index: Number,
      href: String,
    },
  ],
});

const Blogs = mongoose.model('Blog',BlogSchema)

module.exports = Blogs;