import React, { useEffect, useState, useRef } from "react"

export function useWindowScrollY() {
  const [windowScrolled, setWindowScrolled] = React.useState(0)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = () => setWindowScrolled(window.pageYOffset)
      window.addEventListener("scroll", handler)
      return () => window.removeEventListener("scroll", handler)
    }
  })

  return windowScrolled
}

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}
