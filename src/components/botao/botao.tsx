import React from 'react'
import {BotaoProps, BotaoStyled, TextoBotao} from './botao.styles'
import {StyleSheetManager} from 'styled-components'
import {cores} from 'resources/cores'
import {Icone} from 'components/icone'

export const Botao = ({
  aoClicar,
  icone,
  texto,
  corTexto,
  corTextoDesativado,
  corDesabilitado,
  textoProps,
  iconeProps,
  espaco,
  ...props
}: Readonly<BotaoProps>) => {
  corTexto = props.disabled ? corTextoDesativado ?? cores.neutralDark : corTexto
  const corIcone = props.disabled
    ? corTextoDesativado ?? cores.neutralDark
    : iconeProps?.cor ?? corTexto
  return (
    <StyleSheetManager shouldForwardProp={prop => !!prop}>
      <BotaoStyled
        espaco={espaco}
        onClick={aoClicar}
        $corDesabilitado={corDesabilitado}
        {...props}
      >
        <TextoBotao
          data-testid={'texto-botao'}
          cor={corTexto}
          cursor={props.disabled ? 'default' : 'pointer'}
          {...textoProps}
        >
          {texto}
        </TextoBotao>
        {icone && (
          <Icone
            icone={icone}
            cor={corIcone}
            altura={iconeProps?.altura ?? 24}
            largura={iconeProps?.largura ?? 24}
            {...iconeProps}
          />
        )}
      </BotaoStyled>
    </StyleSheetManager>
  )
}
