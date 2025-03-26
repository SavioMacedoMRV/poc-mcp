import React from 'react'
import ReactDOM from 'react-dom/client'
import {MfTemplate} from 'types/interfaces'
import {WebRoutes} from './routes'
import {AppInsightsContext} from '@microsoft/applicationinsights-react-js'
import {reactPlugin} from 'services/applicationInsights'
import './index.css'

const mount = ({
  mountPoint,
  ...props
}: {
  mountPoint: HTMLElement
  rotaInicial?: string
  rootLocal?: boolean
  params: MfTemplate
}) => {
  const root = ReactDOM.createRoot(mountPoint)

  root.render(
    <React.StrictMode>
      <AppInsightsContext.Provider value={reactPlugin}>
        <WebRoutes {...props} />
      </AppInsightsContext.Provider>
    </React.StrictMode>,
  )

  return () => queueMicrotask(() => root.unmount())
}

export {mount}
