import React, {ReactNode} from 'react'
import * as S from './containerPage.styles'
import {Cabecalho, CabecalhoProps} from 'components/cabecalho'
import {BotaoScrollTop} from 'components/botaoScrollTop'

interface Props {
  children: ReactNode
  $corFundo?: string
  semCabecalho?: boolean
  comBotaoScrollTop?: boolean
  cabecalhoProps?: CabecalhoProps
}

export const ContainerPage = ({
  comBotaoScrollTop,
  semCabecalho,
  $corFundo,
  children,
  cabecalhoProps,
}: Readonly<Props>) => {
  return (
    <S.Container data-testid={'container-page-ordens'} $corFundo={$corFundo}>
      {!semCabecalho && <Cabecalho {...cabecalhoProps} />}
      <S.Content
        data-testid={'content-page-ordens'}
        $semCabecalho={semCabecalho}
      >
        {children}
        {comBotaoScrollTop && <BotaoScrollTop />}
      </S.Content>
    </S.Container>
  )
}
