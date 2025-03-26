import React, {useEffect, useRef, useState} from 'react'
import {StyleSheetManager} from 'styled-components'
import {
  BotaoMenuProps,
  BotaoMenuIcone,
  ContainerBotaoMenu,
  ContainerSuspenso,
  BotaoMenuTexto,
  IconeBotao,
  TextoBotao,
  TextoTitulo,
} from './botaoMenu.styles'
import {cores} from 'resources/cores'

export const BotaoMenu = ({
  botao,
  icone,
  titulo,
  cor,
  corAtivo,
  desabilitado,
  componenteOpcoes,
  'data-testid': testid,
  ...props
}: Readonly<BotaoMenuProps>) => {
  const [exibirOpcoes, setExibirOpcoes] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleChangeExibirOpcoes = () => {
    setExibirOpcoes(prev => !prev)
  }

  const handleCliqueForaDoMenu = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setExibirOpcoes(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleCliqueForaDoMenu)
    return () => {
      document.removeEventListener('mousedown', handleCliqueForaDoMenu)
    }
  }, [])

  let corBotao = cor
  if (exibirOpcoes) {
    corBotao = corAtivo ?? cores.complementary05
  }
  return (
    <StyleSheetManager shouldForwardProp={prop => !!prop}>
      <ContainerBotaoMenu ref={dropdownRef} data-testid={testid} {...props}>
        {icone ? (
          <BotaoMenuIcone
            data-testid={
              testid ? `${testid}-icon-exibir-opcoes` : 'btn-icon-exibir-opcoes'
            }
            aoClicar={handleChangeExibirOpcoes}
            icone={icone}
            cor={corBotao}
            disabled={desabilitado}
          />
        ) : (
          botao && (
            <BotaoMenuTexto
              data-testid={
                testid ? `${testid}-exibir-opcoes` : 'btn-exibir-opcoes'
              }
              onClick={handleChangeExibirOpcoes}
              disabled={desabilitado}
              $corBorda={corBotao}
              {...props}
            >
              <IconeBotao cor={corBotao} inclinacao={exibirOpcoes ? 180 : 0} />
              <TextoBotao
                data-testid={'txt-botao-menu'}
                cursor={desabilitado ? 'default' : 'pointer'}
                {...botao.textoProps}
              >
                {botao.texto}
              </TextoBotao>
            </BotaoMenuTexto>
          )
        )}
        {exibirOpcoes && (
          <ContainerSuspenso
            data-testid="menu-suspenso"
            onClick={handleChangeExibirOpcoes}
          >
            {titulo && <TextoTitulo>{titulo}</TextoTitulo>}
            {componenteOpcoes}
          </ContainerSuspenso>
        )}
      </ContainerBotaoMenu>
    </StyleSheetManager>
  )
}
