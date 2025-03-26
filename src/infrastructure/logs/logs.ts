import {
  IAutoExceptionTelemetry,
  SeverityLevel,
} from '@microsoft/applicationinsights-common'
import {ICustomProperties} from '@microsoft/applicationinsights-web'
import {appInsights} from 'services/applicationInsights'
import {Evento} from 'types/enums'

export function RegistrarErro({
  erro,
  propriedades,
}: {
  erro: Error | IAutoExceptionTelemetry
  propriedades: ICustomProperties
}) {
  appInsights.trackException(
    {
      exception: erro,
      severityLevel: SeverityLevel.Error,
    },
    propriedades,
  )
}

export function RegistrarComportamento({
  mensagem,
  propriedades,
}: {
  mensagem: string
  propriedades: ICustomProperties
}) {
  appInsights.trackTrace(
    {
      message: mensagem,
      severityLevel: SeverityLevel.Information,
    },
    propriedades,
  )
}

export function RegistrarEvento({
  evento,
  propriedades,
}: {
  evento: Evento
  propriedades?: ICustomProperties
}) {
  appInsights.trackEvent({name: evento}, propriedades)
}
