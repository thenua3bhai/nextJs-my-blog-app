//this file and folder created for helper files. to help in execution code on pages

//For extracting metadata and fetching post data from markdown files.

import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");
//process.cwd() refer to root directory always

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory); //it will give array of filenames inside posts folder
}

//by calling this function we will get all data of any post by passing its filename.

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension because slug and filename same hi h agr file extension hata de to.

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content,
  }; //creating post data as js object
  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  }); // it will create array of all the post data objects.

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  ); //sorting in js based on date decreasing order.

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  //for featured posts we have to etch all the post, if you don't want it, make json file of all featured post slugs,so we can fetch only those . For big blog it was needed, for small like us it is not an issue.

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  //it creates array of only featured posts by simply checking isFeatured is true or not in allPosts array.

  return featuredPosts;
}
