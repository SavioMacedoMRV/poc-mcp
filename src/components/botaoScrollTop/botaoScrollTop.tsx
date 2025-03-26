import React, {useEffect, useState} from 'react'
import * as S from './botaoScrollTop.styles'
import {Evento} from 'types/enums'
import {RegistrarEvento} from 'infrastructure/logs'

interface BotaoScrollTopProps {
  aoClicar?: () => void
}

export const BotaoScrollTop = ({aoClicar}: Readonly<BotaoScrollTopProps>) => {
  const [exibirBotaoScrollTop, setExibirBotaoScrollTop] = useState(false)

  const aoClicarScrollTop = () => {
    RegistrarEvento({evento: Evento.BotaoScrollTopClick})

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    if (aoClicar) {
      aoClicar()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      setExibirBotaoScrollTop(scrollPosition > windowHeight / 4)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <S.BotaoStyled
      data-testid={'btn-scroll-top'}
      $exibir={exibirBotaoScrollTop}
      onClick={aoClicarScrollTop}
    >
      <S.IconeScrollTop />
      <S.TextoScrollTop>voltar ao início</S.TextoScrollTop>
    </S.BotaoStyled>
  )
}
