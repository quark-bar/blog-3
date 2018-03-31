import React, { Component } from "react";
import Template from "../../templates/blog-post";
import p5 from "p5";

import sketch from "./sketch";

export const data = {
  fullPath: "2018-03-31-visualizing-the-simplest-neural-net",
  path: "/visualizing-the-simplest-neural-net",
  date: "2018-03-31",
  author: "Charles Harrington",
  title: "Visualizing The Simplest Neural Net",
  category: "Deep Learning",
  markdown: false,
  image: "qp-fast.jpg",
  excerpt: "The cool thing about cool things is..."
};

const template = { markdownRemark: { frontmatter: data } };

export default function Post({ pathContext }) {
  const { imagesInPost } = pathContext;
  return (
    <Template data={template}>
      <CustomPost images={imagesInPost} />
    </Template>
  );
}

// This is where you write the post!
class CustomPost extends Component {
  render() {
    const { images } = this.props;
    return (
      <div>
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  componentWillReceiveProps(newprops) {
    if(this.props.sketch !== newprops.sketch){
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.canvas = new p5(newprops.sketch, this.wrapper);
    }
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper}></div>;
  }
}