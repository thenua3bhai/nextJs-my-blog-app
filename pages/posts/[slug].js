//slug named to make human readable url and search engine friendly ids are not good looking.....
//slug m kya dalenge dekhte h and id se kese linkage hoga aage dekheneg ?

import Head from "next/head";
import { Fragment } from "react";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
  return (
    <Fragment>
      {/* we must add metadata(ye html ke head tag m dalta h and next se ye waha direct html ka heda tag bn jasta h), here  most imp. for seo pages this,individul page content, so contenct should be dynamic for each page differnt, jb page se kuch search hoga to seo pkd tb bhi lega jldi se
      we can add more metadatr heer if we need like fb images which fb will use to share something like that,jese youtube show krta h whats app p share m,,,jb jrurt hogi dekh lenge abhi itne deep ki jrurt nhi*/}
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  }; //use revalidate becuase if we edit post we want latest data, and not want to build entire application for small fix...
  //Can we do it without building all app just update 1 file typo and build it..?? pta lgana max ne bola tha isiliye revalidate lgaya h
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  }; // false, coz. we will pregenerate this page for all the posts ,we very less posts so no problem.. jyada posts hoti to blocking use krte and common post pages hi pre generate krte.  fallback false t oloading time aur kuch render nhi krana pdega baki fallback video m dekhna...
}

export default PostDetailPage;
