import { Fragment } from "react";
import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        {/* title wahi h jo browser m loadin m upar tab m dikhta h ,pr meta kya h and kyu h ? ek vidoe m h isi course m dekhna*/}
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}
export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
