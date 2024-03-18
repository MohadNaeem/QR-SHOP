import React from "react"
import { Provider as ScenifyProvider } from "@layerhub-io/react"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { BaseProvider, LightTheme } from "baseui"
import { store } from "./store/store"
import { Provider as ReduxProvier } from "react-redux"
import { AppProvider } from "./contexts/AppContext"
import { DesignEditorProvider } from "./contexts/DesignEditor"
import { I18nextProvider } from "react-i18next"
import { TimerProvider } from "@layerhub-io/use-timer"
import i18next from "i18next"
import Router from "./Router"
import { positions, transitions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import "./translations"
import { UserAuthContextProvider as AuthContext } from "./qr-lab/context/AuthContext.jsx"

const engine = new Styletron()
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <AuthContext>
        <ReduxProvier store={store}>
          <DesignEditorProvider>
            <TimerProvider>
              <AppProvider>
                <ScenifyProvider>
                  <StyletronProvider value={engine}>
                    <BaseProvider theme={LightTheme}>
                      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
                    </BaseProvider>
                  </StyletronProvider>
                </ScenifyProvider>
              </AppProvider>
            </TimerProvider>
          </DesignEditorProvider>
        </ReduxProvier>
      </AuthContext>
    </AlertProvider>
  )
}

export default Provider
