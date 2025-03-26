import React from 'react'
import * as S from './componenteErro.styles'

interface ComponenteErroProps {
  estadoVazio?: boolean
}
export function ComponenteErro({estadoVazio}: Readonly<ComponenteErroProps>) {
  return estadoVazio ? (
    <S.Container data-testid="mensagem-erro-estado-vazio">
      <S.IconeLupa />
      <S.Mensagem>Nenhum item foi encontrado</S.Mensagem>
    </S.Container>
  ) : (
    <S.Container data-testid="mensagem-erro">
      <S.IconeAlerta />
      <S.Mensagem>Houve um erro ao acessar o Portal 360</S.Mensagem>
    </S.Container>
  )
}
