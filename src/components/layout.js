import React from 'react'
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Global } from '@emotion/core'

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Global
        styles={(theme) => ({
          body: {
            margin: 0,
          },
        })}
      />

      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </React.Fragment>
  )
}

export default Layout
