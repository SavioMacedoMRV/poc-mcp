import React, {useState, useEffect, useRef, useCallback} from 'react'
import {StyleSheetManager} from 'styled-components'
import {
  InputStyled,
  InputProps,
  InputContainer,
  InputIconePesquisa,
  TextAreaStyled,
  IconeInput,
  InputLabel,
  InputWrapper,
  OptionsContainer,
  OptionItem,
  OptionText,
  Divider,
  LoadingContainer,
  RelativeContainer
} from './input.styles'
import PesquisarSVG from 'icons/iPesquisar.svg'
import FecharSVG from 'icons/iFechar.svg'
import {Icone} from 'components/icone'
import {Texto} from 'components/texto'
import {cores} from 'resources/cores'

export const Input = ({
  tipo,
  valor,
  cor,
  corBorda,
  corBordaFocada,
  corTextoDesativado,
  itemSelecionado,
  numeroLinhas = 1,
  numeroMaxLinhas,
  placeholder,
  semBorda,
  textoProps,
  icone,
  desabilitaIcone,
  desabilitado,
  iconeEsquerda,
  'data-testid': testId = 'input',
  aoDesfocar,
  aoFocar,
  aoSubmeter,
  aoDigitar,
  label,
  required = false,
  // Propriedades para dropdown
  opcoesPesquisa,
  aoSelecionarOpcao,
  carregandoOpcoes = false,
  ...props
}: Readonly<InputProps>) => {
  const tipoPesquisa = tipo === 'pesquisa'
  const tipoNumero = tipo === 'numero'
  const tipoTextArea = tipo === 'textarea'

  const [pesquisaAtiva, setPesquisaAtiva] = useState(
    Boolean((tipoTextArea && valor) || (tipoPesquisa && valor)),
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState(valor?.toString() ?? '')
  const [alturaInicial, setAlturaInicial] = useState<number | undefined>()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [mostrarTodasOpcoes, setMostrarTodasOpcoes] = useState(false)

  const displayLabel = required ? `${label} (obrigatório)` : label

  const ajustarAltura = useCallback(() => {
    if (textAreaRef.current) {
      const computedStyle = window.getComputedStyle(textAreaRef.current)
      if (!alturaInicial) {
        const lineHeight = isNaN(parseFloat(computedStyle.lineHeight))
          ? undefined
          : parseFloat(computedStyle.lineHeight)

        const paddingTop = parseFloat(computedStyle.paddingTop)
        const paddingBottom = parseFloat(computedStyle.paddingBottom)
        const fontSize = parseFloat(computedStyle.fontSize)
        setAlturaInicial(lineHeight ?? paddingTop + paddingBottom + fontSize)
      }

      const maxAltura =
        numeroMaxLinhas && alturaInicial
          ? numeroMaxLinhas * alturaInicial
          : Infinity

      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, maxAltura)}px`
    }
  }, [numeroMaxLinhas, alturaInicial])

  useEffect(() => {
    if (tipoTextArea && numeroMaxLinhas && textAreaRef.current) {
      const valorTruncado = truncarTexto({
        valor: value,
        numeroMaxLinhas,
        textAreaRef,
      })

      if (valorTruncado !== value) {
        setValue(valorTruncado)
      }
    }
  }, [tipoTextArea, numeroMaxLinhas, value, textAreaRef])

  useEffect(() => {
    setValue(valor?.toString() ?? '')
  }, [valor])

  useEffect(() => {
    ajustarAltura()
  }, [ajustarAltura, value])

  // Efeito para fechar o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filtrar opções baseado no texto digitado
  const getFilteredOptions = () => {
    if (!opcoesPesquisa || carregandoOpcoes) return []
    
    // Se mostrarTodasOpcoes for verdadeiro, retorna todas as opções sem filtrar
    if (mostrarTodasOpcoes) {
      return opcoesPesquisa
    }
    
    if (value) {
      return opcoesPesquisa.filter(opcao => 
        opcao.toLowerCase().includes(value.toLowerCase())
      )
    }
    
    return opcoesPesquisa
  }

  const formatarNumero = (valor: string): string => {
    return valor.replace('.', ',')
  }

  const validarNumero = (numero: string): boolean => {
    return numero === '' || /^\d+(,\d{0,3})?$/.test(numero)
  }

  const handleTipoNumero = (
    valorInput: string,
    tipoNumero: boolean,
    aoDigitar?: (valor: string | number) => void,
  ) => {
    const numeroFormatado = formatarNumero(valorInput)

    if (validarNumero(numeroFormatado)) {
      setValue(numeroFormatado)

      if (aoDigitar) {
        let valorDigitado: string | number
        if (placeholder) {
          valorDigitado = numeroFormatado
        } else {
          valorDigitado = formatarValor(tipoNumero, numeroFormatado)
        }

        aoDigitar(valorDigitado)
      }
    }
  }

  const handleChange = (event: any): void => {
    const valorInput = event.target.value

    if (tipoNumero) {
      handleTipoNumero(valorInput, tipoNumero, aoDigitar)
      return
    }

    setValue(valorInput)

    if (aoDigitar) {
      aoDigitar(valorInput)
    }

    // Abrir dropdown ao digitar se for tipo pesquisa e tiver opções
    if (tipoPesquisa && opcoesPesquisa) {
      setIsDropdownOpen(true)
    }
  }

  const handleAoDesfocar = () => {
    if (aoDesfocar) {
      aoDesfocar(formatarValor(tipoNumero, value))
    }
    setIsDropdownOpen(false)
  }

  const handleAoFocar = () => {
    if (tipoPesquisa && !value) {
      setPesquisaAtiva(false)
    }
    // Redefine o mostrarTodasOpcoes quando o input recebe foco
    setMostrarTodasOpcoes(false)
    if (aoFocar) {
      aoFocar()
    }
  }

  const handleSubmeter = (key: any) => {
    if (
      key.type === 'keydown' &&
      !['Enter', 'NumpadEnter'].includes(key.code)
    ) {
      return
    }

    if (aoSubmeter) {
      if (tipoPesquisa) {
        aoSubmeter(value.toUpperCase())
        setPesquisaAtiva(Boolean(value))
      } else {
        aoSubmeter(formatarValor(tipoNumero, value))
      }
    }
  }

  const handleLimparPesquisa = () => {
    if (aoSubmeter) {
      aoSubmeter()
    }

    setValue('')
    setPesquisaAtiva(false)
  }

  const handleSelecionarOpcao = (opcao: string) => {
    setValue(opcao)
    setPesquisaAtiva(true) // Ativa o estado de pesquisa para mostrar o ícone X
    setIsDropdownOpen(false)
    setMostrarTodasOpcoes(false) // Reseta o estado de mostrar todas as opções
    if (aoSelecionarOpcao) {
      aoSelecionarOpcao(opcao)
    }
  }

  // Função para lidar com o clique no ícone de lupa
  const handleMostrarTodasOpcoes = () => {
    if (tipoPesquisa && opcoesPesquisa) {
      setMostrarTodasOpcoes(true)
      setIsDropdownOpen(true)
    }
  }

  return (
    <StyleSheetManager shouldForwardProp={prop => !!prop}>
      <RelativeContainer ref={containerRef} data-testid={testId}>
        <InputWrapper>
          {label && <InputLabel>{displayLabel}</InputLabel>}
          <InputContainer
            onBlur={handleAoDesfocar}
            onFocus={handleAoFocar}
            $corBorda={corBorda}
            $corBordaFocada={corBordaFocada}
            $semBorda={semBorda}
            $desabilitado={desabilitado}
            $iconeEsquerda={iconeEsquerda}
            $tipoTextArea={tipoTextArea}
            {...props}
          >
            {tipoTextArea ? (
              <TextAreaStyled
                data-testid={'textarea-' + testId}
                rows={numeroLinhas}
                ref={textAreaRef}
                autoFocus={tipoTextArea}
                value={value}
                onChange={handleChange}
                onKeyDown={handleSubmeter}
                onBlur={handleAoDesfocar}
                cor={textoProps?.cor ?? cor}
                placeholder={placeholder}
                $corTextoDesativado={corTextoDesativado}
                $numeroMaxLinhas={numeroMaxLinhas}
                disabled={desabilitado}
                {...textoProps}
              />
            ) : (
              <InputStyled
                data-testid={'input-' + testId}
                autoFocus={props.autoFocus}
                value={value}
                onChange={handleChange}
                onKeyDown={handleSubmeter}
                onBlur={handleAoDesfocar}
                cor={textoProps?.cor ?? cor}
                placeholder={placeholder}
                $corTextoDesativado={corTextoDesativado}
                disabled={desabilitado}
                {...textoProps}
              />
            )}
            {(tipoPesquisa || tipoTextArea) && !desabilitaIcone && (
              <IconeBotao
                testId={testId}
                icone={icone}
                pesquisaAtiva={pesquisaAtiva}
                itemSelecionado={itemSelecionado}
                handleLimparPesquisa={handleLimparPesquisa}
                handleSubmeter={handleSubmeter}
                handleMostrarTodasOpcoes={handleMostrarTodasOpcoes}
              />
            )}
          </InputContainer>
          
          {/* Dropdown de pesquisa */}
          {tipoPesquisa && opcoesPesquisa && (
            <>
              {carregandoOpcoes && isDropdownOpen ? (
                <LoadingContainer>
                  <Texto tamanho={12} estilo="regular" cor={cores.neutralDark}>
                    Carregando...
                  </Texto>
                </LoadingContainer>
              ) : (
                <OptionsContainer $isOpen={isDropdownOpen}>
                  {getFilteredOptions().length > 0 ? (
                    getFilteredOptions().map((opcao, index) => (
                      <React.Fragment key={opcao}>
                        <OptionItem
                          onClick={() => handleSelecionarOpcao(opcao)}
                          data-testid={`option-item-${index}`}
                        >
                          <OptionText>{opcao}</OptionText>
                        </OptionItem>
                        {index < getFilteredOptions().length - 1 && <Divider />}
                      </React.Fragment>
                    ))
                  ) : (
                    value && isDropdownOpen && (
                      <Texto tamanho={12} estilo="regular" cor={cores.neutralDark}>
                        Nenhuma opção encontrada
                      </Texto>
                    )
                  )}
                </OptionsContainer>
              )}
            </>
          )}
        </InputWrapper>
      </RelativeContainer>
    </StyleSheetManager>
  )
}

const IconeBotao = ({
  testId,
  icone,
  pesquisaAtiva,
  itemSelecionado,
  handleLimparPesquisa,
  handleSubmeter,
  handleMostrarTodasOpcoes,
}: {
  testId: string
  icone?: IconeInput
  pesquisaAtiva: boolean
  itemSelecionado?: boolean
  handleLimparPesquisa: () => void
  handleSubmeter: (key: any) => void
  handleMostrarTodasOpcoes: () => void
}) => {
  const styleIcone = {
    icone: icone?.icone,
    cor: icone?.cor,
    largura: icone?.largura,
    altura: icone?.altura,
    inclinacao: icone?.inclinacao,
  }

  if (pesquisaAtiva || itemSelecionado) {
    return (
      <InputIconePesquisa
        data-testid={`btn-${testId}-limpar`}
        icone={FecharSVG}
        cor={styleIcone.cor}
        largura={styleIcone.largura}
        altura={styleIcone.altura}
        aoClicar={handleLimparPesquisa}
      />
    )
  }

  return styleIcone.icone ? (
    <Icone
      data-testid={`icone-${testId}-icone`}
      icone={styleIcone.icone}
      cor={styleIcone.cor}
      largura={styleIcone.largura}
      altura={styleIcone.altura}
      inclinacao={styleIcone.inclinacao}
    />
  ) : (
    <InputIconePesquisa
      data-testid={`btn-${testId}-pesquisar`}
      icone={PesquisarSVG}
      cor={styleIcone.cor}
      largura={styleIcone.largura}
      altura={styleIcone.altura}
      aoClicar={handleMostrarTodasOpcoes}
    />
  )
}

export const truncarTexto = ({
  valor,
  numeroMaxLinhas,
  textAreaRef,
}: {
  valor: string
  numeroMaxLinhas?: number
  textAreaRef: React.RefObject<HTMLTextAreaElement>
}) => {
  if (valor && textAreaRef.current?.clientWidth && numeroMaxLinhas) {
    const larguraTextArea = textAreaRef.current.clientWidth
    const tamanhoFonte = parseFloat(
      window.getComputedStyle(textAreaRef.current).fontSize,
    )
    const charsPorLinha = Math.floor(larguraTextArea / (tamanhoFonte * 0.64))
    const maxChars = charsPorLinha * numeroMaxLinhas
    if (valor.length > maxChars) {
      return valor.slice(0, maxChars).trim() + '...'
    }
  }

  return valor
}

const formatarValor = (tipoNumero: boolean, valor: string) => {
  if (tipoNumero) {
    const numeroFloat = parseFloat(valor.replace(/\./g, '').replace(',', '.'))
    return isNaN(numeroFloat) ? 0 : numeroFloat
  }

  return valor
}
