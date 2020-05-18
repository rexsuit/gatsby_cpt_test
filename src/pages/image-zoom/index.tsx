import React from 'react'
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

import ImageZoom from '../../components/ImageZoom'

function ImageZoomPage() {
  return (
    <Layout>
      <SEO title="Image Zoom" />
      <DndProvider backend={Backend}>
        <ImageZoom />
      </DndProvider>
    </Layout>
  )
}

export default ImageZoomPage
