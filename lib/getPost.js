import posts from "../data/posts.json";

export async function getPost(id) {
  const post = posts.find(post => post.id === parseInt(id));
  return post;
}

export default getPost;
