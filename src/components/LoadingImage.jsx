import React from "react"
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useInView } from "react-intersection-observer"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ImBox = ({ index, ...props }) => {
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

  const [ref, inView] = useInView({ threshold: 0.5 })
  console.log({ index }, { inView })
  const animDur = `0.3s`
  const [loaded, setLoaded] = React.useState(false)
  return (
    <div
      ref={ref}
      css={{
        maxWidth: 300,
        overflow: "hidden",
        transform: `scaleX(${inView ? 1 : 0})`,
        transformOrigin: "0",
        transition: `${animDur} ease-in-out transform`,
        position: "relative",
        width: "100%",
      }}
      {...props}
    >
      <div css={{ objectFit: "cover", width: "100%" }}>
        <Img
          fluid={data.placeholderImage.childImageSharp.fluid}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(${[0, 0, 0].map(_ =>
            Math.floor(Math.random() * 256)
          )}, 1)`,
          transform: `scaleX(${inView && loaded ? 0 : 1})`,
          transformOrigin: "100%",
          transition: `${animDur} ease-in-out transform`,
          transitionDelay: `${animDur}`,
        }}
      />
    </div>
  )
}

export default ImBox
