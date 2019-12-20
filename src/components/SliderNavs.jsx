import React from "react"
import Slider from "react-slick"

const Slide = ({ ...props }) => (
  <div
    style={{
      height: 200,
      background: `rgba(${[0, 0, 0].map(_ =>
        Math.floor(Math.random() * 256)
      )}, ${Math.random()})`,
    }}
    {...props}
  />
)

export const SliderNavs = ({ ...props }) => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const [ref1, setRef1] = React.useState(null)
  const [ref2, setRef2] = React.useState(null)

  return (
    <div {...props}>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <div style={{ display: "flex" }}>
        <Slider
          {...{ ...settings, asNavFor: ref2 }}
          ref={setRef1}
          style={{ width: "40%" }}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div>
                <Slide>{i}</Slide>
              </div>
            ))}
        </Slider>
        <Slider
          {...{ ...settings, asNavFor: ref1 }}
          ref={setRef2}
          style={{ width: "40%" }}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div>
                <Slide>{i}</Slide>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  )
}
