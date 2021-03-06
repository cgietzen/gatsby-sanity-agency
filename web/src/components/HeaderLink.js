/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import React from "react"

export default props => (
  <Link
    {...props}
    sx={{
      fontFamily: "heading",
      fontSize: "5",
      color: "background",
      textDecoration: "none",
      lineHeight: 1.125,
      py: "1",
    }}
  />
)
