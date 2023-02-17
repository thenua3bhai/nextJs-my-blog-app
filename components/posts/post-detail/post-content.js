import ReactMarkdown from "react-markdown";

import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; //we will use prism type of code highlighting here, this will give us container to digest code and show it in nice way,much more readable better than defaulting formatting without this highlighter
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
// using cjs it can be executed on server side..

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  //by this we can tell react-markdown how certain element should be rendered,
  const customRenderers = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    //customRenderer we are passing to react markdown because by default it is using img tag simply
    //Here we are doing to accept all <p> tag passed by react-markdown check for img tag, if it's there change it, otherwise keep it like it passed,,,

    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        //image is object of image data which react-markdown got from the actual markdown text

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
              layout="responsive"
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    //code() is also officially supported identifier for such code blocks , like above img() to custom Renderers

    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      return (
        //this 3rd party highlighter presents code very good looking, and type and theme(style) changing options are there, check on there website..
        // here type is Prism and style is atomDark
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
      {/* ReactMarkdown for making md content into html, 
      components to custom rendered components instead of default by react markdown to html. */}
    </article>
  );
}

export default PostContent;
