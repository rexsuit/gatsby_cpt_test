import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"

import { useSpring, animated } from "react-spring"

import { useWindowScrollY, useMeasure } from "../utility"

export default () => {
  const [bind, { top: viewHeight }] = useMeasure()

  const y = useWindowScrollY()
  const spring = useSpring({
    y,
    config: {
      mass: 100,
      friction: 300,
      tenstion: 20,
    },
  })
  const scrollRef = React.useRef(null)

  console.log({
    window,
    offsetTop: scrollRef.current ? scrollRef.current.offsetTop : null,
    viewHeight,
  })

  const trans = val =>
    `translateY(${val * 1.5 -
      window.scrollY +
      (scrollRef.current ? scrollRef.current.offsetTop : 0)}px)`

  return (
    <div ref={scrollRef} {...bind}>
      <div
        sx={{
          width: "100%",
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <animated.div
          sx={{
            width: 100,
            height: 100,
            borderRadius: 12,
            bg: "orange",
          }}
          style={{
            transform: spring.y.interpolate(trans),
          }}
        >
          woooof
        </animated.div>
      </div>
    </div>
  )
}
