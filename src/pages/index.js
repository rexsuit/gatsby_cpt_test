import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
/** @jsx jsx */
import { jsx } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import ImBox from "../components/LoadingImage"
import ParallaxScene from "../components/ParallaxScene"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const scrollRef = React.useRef(null)

  return (
    <Layout>
      <SEO title="Home" />
      <ParallaxScene />
      <div
        css={{
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          margin: "0 auto",
        }}
      >
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>

        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        </div>
        <Link to="/page-2/">Go to page 2</Link>
        {/* <div style={{ position: "fixed", top: 24, left: 24 }}>
          <p>{scrollPos} ss</p>
        </div> */}
        <div style={{ height: "10px" }} />
        <div ref={scrollRef}>
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <ImBox index={i} />
                <div
                  style={{ width: "100%", height: 700, background: "red" }}
                ></div>
                <div
                  style={{ width: "100%", height: 700, background: "orange" }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
