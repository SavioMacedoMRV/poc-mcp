import React, {useState, useEffect, useRef, useCallback} from 'react'
import {StyleSheetManager} from 'styled-components'
import {
  InputStyled,
  InputProps,
  InputContainer,
  InputIconePesquisa,
  TextAreaStyled,
  IconeInput,
} from './input.styles'
import PesquisarSVG from 'icons/iPesquisar.svg'
import FecharSVG from 'icons/iFechar.svg'
import {Icone} from 'components/icone'

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
  ...props
}: Readonly<InputProps>) => {
  const tipoPesquisa = tipo === 'pesquisa'
  const tipoNumero = tipo === 'numero'
  const tipoTextArea = tipo === 'textarea'

  const [pesquisaAtiva, setPesquisaAtiva] = useState(
    Boolean((tipoTextArea && valor) || (tipoPesquisa && valor)),
  )

  const [value, setValue] = useState(valor?.toString() ?? '')
  const [alturaInicial, setAlturaInicial] = useState<number | undefined>()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

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
  }

  const handleAoDesfocar = () => {
    if (aoDesfocar) {
      aoDesfocar(formatarValor(tipoNumero, value))
    }
  }

  const handleAoFocar = () => {
    if (tipoPesquisa && !value) {
      setPesquisaAtiva(false)
    }
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

  return (
    <StyleSheetManager shouldForwardProp={prop => !!prop}>
      <InputContainer
        data-testid={testId}
        onBlur={handleAoDesfocar}
        onFocus={handleAoFocar}
        $corBorda={corBorda ?? cor}
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
          />
        )}
      </InputContainer>
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
}: {
  testId: string
  icone?: IconeInput
  pesquisaAtiva: boolean
  itemSelecionado?: boolean
  handleLimparPesquisa: () => void
  handleSubmeter: (key: any) => void
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
      aoClicar={handleSubmeter}
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
