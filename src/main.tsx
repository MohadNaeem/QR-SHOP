import ReactDOM from "react-dom/client"
import Provider from "./Provider"
import Router from "./Router"
import Container from "./Container"
import "./styles/styles.css"
import ReactGA from 'react-ga';
const TRACKING_ID = "G-F4X6ZNC3YR"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    {/* <Container> */}
      <Router />
    {/* </Container> */}
  </Provider>
)

