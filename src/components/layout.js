import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Global } from "@emotion/core"

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={theme => ({
          body: {
            margin: 0,
          },
        })}
      />
      <div
        style={{
          margin: `0 auto`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
