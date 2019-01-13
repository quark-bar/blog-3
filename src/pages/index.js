import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../layouts";
import s from "./index.module.scss";

export default function Index({ data }) {
  const { edges: mdPosts } = data.allMarkdownRemark;
  const { edges: jsPosts } = data.allJavascriptFrontmatter;
  let frontmatteredJsPosts = jsPosts.filter(
    post => post.node.frontmatter.title
  );
  const sortedPosts = mdPosts.concat(frontmatteredJsPosts).sort((a, b) => {
    return (
      new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)
    );
  });
  console.log("sortedPosts: ", sortedPosts[0])
  return (
    <Layout>
      <div className={s.index}>
        {sortedPosts
          .filter(post => post.node.frontmatter.title.length > 0 && post.node.frontmatter.isBlogPost)
          .map(({ node: post }, index) => {
            return (
              post.frontmatter.path !== "/react-post" && (
                <div key={index} className={s.blogLink}>
                  <Link to={post.frontmatter.path} className="indexLink">
                    <span className={s.title}>{post.frontmatter.title}</span>
                    <span className={s.date}>{post.frontmatter.date}</span>
                  </Link>
                </div>
              )
            );
          })}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            fullPath
            title
            date(formatString: "DD MMMM YYYY")
            path
            category
            isBlogPost
          }
        }
      }
    }
    allJavascriptFrontmatter(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            fullPath
            path
            date(formatString: "DD MMMM YYYY")
            title
            category
            isBlogPost
          }
        }
      }
    }
  }
`;
