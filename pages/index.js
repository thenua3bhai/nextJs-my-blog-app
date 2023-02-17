import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

function WelcomePage(props) {
  return (
    <Fragment>
      <Head>
        {/* title for tab showing, description for search engine crawlers to make SEO friendly */}
        <title>Beautiful Blog</title>
        <meta name="description" content="I post about nature" />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}
export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default WelcomePage;
