import {Empreendimento} from './empreendimento'

export interface MfTemplate {
  auth?: {
    accessToken: string
    idToken: string
  }
  obra?: Empreendimento
}
