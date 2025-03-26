import {
  ApplicationInsights,
  ITelemetryItem,
} from '@microsoft/applicationinsights-web'
import {ReactPlugin} from '@microsoft/applicationinsights-react-js'
import {createBrowserHistory} from 'history'

const browserHistory = createBrowserHistory()
const reactPlugin = new ReactPlugin()

const appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.APP_INSIGHTS_CONNECTION,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: {history: browserHistory},
    },
    enableAutoRouteTracking: true,
    disableAjaxTracking: false,
    autoTrackPageVisitTime: true,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
  },
})
appInsights.loadAppInsights()

appInsights.addTelemetryInitializer((env: ITelemetryItem) => {
  env.tags = env.tags ?? {}
  env.tags['ai.cloud.role'] = 'Portal360-Template'
})

export {reactPlugin, appInsights}
