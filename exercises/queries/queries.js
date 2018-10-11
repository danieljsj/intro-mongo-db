const Post = require('./post')

const postByTitle = (title) => {
  return Post.getOne({title:title}).exec()
}

const postsForAuthor = (authorId) => {
  return Post.find({author: authorId}).exec()
}

const fullPostById = (id) => {
  return Post.getOneById(id)
    .populate()
    .exec();
}

const allPostsSlim = (fieldsToSelect) => {
  return Post.find({}/*, fieldsToSelect.join(" ")*/)
    .select(fieldsToSelect)
    .exec()
}

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({
    // "$expr": { // i'm guessing at the syntax here...
    //   "$gt": [ { "$strLenCP": "$content" }, minContentLength-1 ],
    //   "$lt": [ { "$strLenCP": "$content" }, maxContentLength+1 ],
    // }
    contenLength: {
      $gt: minContentLength,
      $lt: maxContentLength
    }
  })
}

const addSimilarPosts = (postId, similarPosts) => {
  return Post.findByIdAndUpdate(id, {$push: {similarPosts: {$each: similarPosts}}})   
}

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
}
