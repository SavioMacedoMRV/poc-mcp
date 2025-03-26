import React from 'react'
import {BotaoProps, BotaoStyled} from './botaoIcone.styles'
import {StyleSheetManager} from 'styled-components'
import {cores} from 'resources/cores'

export const BotaoIcone = ({
  aoClicar,
  borda,
  semMargem,
  icone: Icone,
  altura = 32,
  largura = altura,
  inclinacao = 0,
  cor = cores.neutralXDark,
  ...props
}: Readonly<BotaoProps>) => {
  return (
    <StyleSheetManager shouldForwardProp={prop => !!prop}>
      <BotaoStyled
        $borda={borda}
        $semMargem={semMargem}
        cor={cor}
        onClick={aoClicar}
        {...props}
      >
        <Icone
          data-testid={'icone'}
          fill={cor}
          width={largura}
          height={altura}
          style={{transform: `rotate(${inclinacao}deg)`}}
        />
      </BotaoStyled>
    </StyleSheetManager>
  )
}
