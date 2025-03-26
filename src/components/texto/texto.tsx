import React from 'react'
import {StyleSheetManager} from 'styled-components'
import {TextoStyled, TextoProps} from './texto.styles'

export const Texto = (props: Readonly<TextoProps>) => {
  return (
    <StyleSheetManager shouldForwardProp={prop => !!prop}>
      <TextoStyled {...props} />
    </StyleSheetManager>
  )
}
