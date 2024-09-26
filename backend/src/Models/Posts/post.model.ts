
async function getPostsWithComments() {
  try {
    const postsWithComments = await knex('posts')
      .select('postID', 'comments');
    return postsWithComments;
  } catch (error) {
    console.error('Error fetching posts with comments:', error);
  }
}

export default getPostsWithComments;
