import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import React from "react"

export default function ({
  children,
  autoHide,
  smUp,
}: {
  children: React.ReactNode
  autoHide?: boolean
  smUp?: boolean
}) {
  return (
    <div style={{ flex: 1, position: smUp ? "static" : "relative" }}>
      <div style={{ height: "100%", width: "100%", position: "absolute", overflow: "hidden" }}>
        <Scrollbars autoHide={autoHide}>{children}</Scrollbars>
      </div>
    </div>
  )
}
