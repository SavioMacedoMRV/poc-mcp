import React from 'react'
import animacao from 'animations/carregando.json'
import * as S from './carregando.styles'

export function Carregando() {
  return (
    <S.Container>
      <S.Animacao data-testid="carregando" animationData={animacao} />
    </S.Container>
  )
}
