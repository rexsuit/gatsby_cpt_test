import React from 'react'
/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Draggabilly from 'draggabilly'
import { animated, useSpring } from 'react-spring'

Draggabilly.prototype.positionDrag = Draggabilly.prototype.setLeftTop

const transition = `0.2s ease-out transform`

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b
// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c
// Clamp val within min and max
const clamp = (val, min, max) => Math.max(Math.min(val, max), min)

let zIndex = 1

const Image = ({ left, top, id, ...props }) => {
  const [hover, hoverSet] = React.useState(false)
  const outer = React.useRef<HTMLDivElement>(null)
  const inner = React.useRef<HTMLDivElement>(null)
  const dragPosPrev = React.useRef({ x: 0, y: 0 })
  const dragPosCurr = React.useRef({ x: 0, y: 0 })
  const innerScalePrev = React.useRef(1)
  const innerScaleCurr = React.useRef(1)
  const outerScalePrev = React.useRef(1)
  const outerScaleCurr = React.useRef(1)
  const dragPosAmt = 0.1
  const innerScaleAmt = 0.15
  const outerScaleAmt = 0.15

  const onDragStart = () => {
    dragPosPrev.current = { x: 0, y: 0 }
  }
  const onDragMove = (event, pointer, moveVector) => {
    // console.log({ moveVector })
    dragPosCurr.current = moveVector
  }
  const onPointerDown = () => {
    innerScaleCurr.current = 1.3
    outerScaleCurr.current = 0.8
  }
  const onPointerUp = () => {
    innerScaleCurr.current = 1
    outerScaleCurr.current = 1
  }

  const overflowVal = 70

  const layout = () => {
    inner.current
      ? (inner.current.style.transform = `translate3d(${getInnerTranslation(
          'x',
        )}px, ${getInnerTranslation('y')}px,0) scale3d(${
          innerScalePrev.current
        }, ${innerScalePrev.current}, 1) rotate3d(1,1,1,0.1deg)`)
      : null

    console.log(
      'outerScale ',
      outerScaleCurr.current,
      ', innerScale ',
      innerScaleCurr.current,
    )
    console.log(
      'outerScale 2',
      outerScalePrev.current,
      ', innerScale 2',
      innerScalePrev.current,
    )

    // The draggable element transform
    outer.current
      ? (outer.current.style.transform = `translate3d(${(
          dragPosPrev.current.x - dragPosCurr.current.x
        ).toFixed(2)}px,${(
          dragPosPrev.current.y - dragPosCurr.current.y
        ).toFixed(2)}px,0) scale3d(${outerScalePrev.current}, ${
          outerScalePrev.current
        }, 1) rotate3d(1,1,1,0.1deg)`)
      : null
  }

  React.useEffect(() => {
    const draggie = new Draggabilly(outer.current)
    draggie.on('pointerDown', onPointerDown)
    draggie.on('dragStart', onDragStart)
    draggie.on('dragMove', onDragMove)
    draggie.on('pointerUp', onPointerUp)
    render()
  }, [])

  const getInnerTranslation = (axis: 'x' | 'y') => {
    const distance = dragPosPrev.current[axis] - dragPosCurr.current[axis]
    const boundaries = {
      distance: { min: 0, max: 400 },
      translation: {
        min: 0,
        max:
          ((overflowVal / 2) * innerScalePrev.current) / outerScalePrev.current,
      },
    }

    let translationVal = map(
      Math.abs(distance),
      boundaries.distance.min,
      boundaries.distance.max,
      boundaries.translation.min,
      boundaries.translation.max,
    )
    translationVal = clamp(
      translationVal,
      boundaries.translation.min,
      boundaries.translation.max,
    )

    return distance > 0
      ? translationVal.toFixed(2)
      : -1 * translationVal.toFixed(2)
  }

  const render = () => {
    dragPosPrev.current = {
      x: lerp(dragPosPrev.current.x, dragPosCurr.current.x, dragPosAmt),
      y: lerp(dragPosPrev.current.y, dragPosCurr.current.y, dragPosAmt),
    }

    innerScalePrev.current = lerp(
      innerScalePrev.current,
      innerScaleCurr.current,
      innerScaleAmt,
    )
    outerScalePrev.current = lerp(
      outerScalePrev.current,
      outerScaleCurr.current,
      outerScaleAmt,
    )
    layout()
    requestAnimationFrame(() => render())
  }

  return (
    <div
      // onPointerDown={() => hoverSet(true)}
      // onPointerUp={() => hoverSet(false)}
      sx={{
        overflow: 'hidden',
        border: '1px solid lightgrey',
        cursor: hover ? 'grabbing' : 'grab',
        zIndex: 2,
        width: 300,
        bg: 'red',
      }}
      ref={outer}
    >
      <animated.div
        style={{
          display: 'block',
          transform: `translate3d(${getInnerTranslation(
            'x',
          )}px, ${getInnerTranslation('y')}px,0) scale3d(${
            innerScalePrev.current
          }, ${innerScalePrev.current}, 1) rotate3d(1,1,1,0.1deg)`,
        }}
        ref={inner}
      >
        <Img {...props} sx={{ pointerEvents: 'none' }} />
      </animated.div>
    </div>
  )
}

interface DragItem {
  type: string
  id: string
  top: number
  left: number
}

const ImageZoom = () => {
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

  const [boxes, setBoxes] = React.useState<{
    [key: string]: {
      top: number
      left: number
      title: string
    }
  }>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 200, left: 180, title: 'Drag me around' },
  })

  return (
    <div>
      <div sx={{ height: 500, position: 'relative' }}>
        {Object.keys(boxes).map((key, i) => {
          const { left, top, title } = boxes[key]
          return (
            <div key={i} sx={{ maxWidth: 300 }}>
              <Image
                fluid={data.placeholderImage.childImageSharp.fluid}
                left={left}
                top={top}
                id={key}
              />
            </div>
          )
        })}
      </div>
      <div
        sx={{
          bg: 'yellow',
          width: '100%',
          height: 500,
          position: 'relative',
          zIndex: 1,
        }}
      ></div>
    </div>
  )
}

export default ImageZoom
