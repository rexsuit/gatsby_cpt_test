import React from "react"
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core"
import Parallax from "parallax-js"

const ParallaxScene = ({ ...props }) => {
  const sceneRef = React.useRef()

  React.useEffect(() => {
    let parallaxInstance = new Parallax(sceneRef.current, {
      relativeInput: true,
      clipRelativeInput: false,
    })
  }, [])

  const anim = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`
  return (
    <div
      ref={sceneRef}
      css={{
        height: 500,
        backgroundColor: "#1c49",
        overflow: "hidden",
      }}
    >
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            data-depth={Math.random()}
            css={{
              height: "100%",
              width: "100%",
            }}
          >
            <div
              css={{
                position: "absolute",
                borderRadius: Math.random() * 50 + "%",
                width: 10 * i,
                height: 10 * i,
                top: Math.random() * 100 + "%",
                right: Math.random() * 100 + "%",
                backgroundColor: `rgba(${[0, 0, 0].map(_ =>
                  Math.floor(Math.random() * 256)
                )}, ${Math.random()})`,
                animation: `${anim} ${Math.max(
                  Math.random() * 50,
                  10
                )}s ease infinite`,
              }}
            ></div>
          </div>
        ))}
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            data-depth={Math.random()}
            css={{
              height: "100%",
              width: "100%",
            }}
          >
            <div
              css={{
                borderRadius: Math.random() * 50 + "%",
                position: "absolute",
                width: 10 * i,
                height: 10 * i,
                top: Math.random() * 100 + "%",
                right: Math.random() * 100 + "%",
                backgroundColor: `rgba(${[0, 0, 0].map(_ =>
                  Math.floor(Math.random() * 256)
                )}, ${Math.random()})`,
                animation: `${anim} ${Math.max(
                  Math.random() * 100,
                  30
                )}s ease infinite`,
              }}
            ></div>
          </div>
        ))}
    </div>
  )
}

export default ParallaxScene
