import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

//This component for making grid of all posts, so we can use it on featured posts component and all posts component for all posts page.

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
