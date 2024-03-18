import React from "react"
import CricketBall from "../assets/cricker-ball.svg"
import "../styles/loader.css"
import LoadingOverlay from "react-loading-overlay"

// const CricketBallLoader = () => (
//   <div className="cricket-ball-loader">
//     <CricketBall className="spinner" />
//   </div>
// )

// export default CricketBallLoader

export const FixedLoader = (props) => {
  return (
    <LoadingOverlay active={props.active} spinner={<img src={CricketBall} className="spinner" />}>
      {props.children}
    </LoadingOverlay>
  )
}
