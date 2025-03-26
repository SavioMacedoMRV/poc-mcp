import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Texto } from 'components/texto'
import { Input } from 'components/input'
import { Icone } from 'components/icone'
import { BotaoIcone } from 'components/botaoIcone'
import { cores } from 'resources/cores'
import { rotas } from 'resources/rotas'
import { hubFormasService, CreateHubRequest } from 'services/hubFormasApi/hubFormas.service'
import ArrowBackIosSVG from '../../assets/icons/iArrowBackIos.svg'
import EditarSVG from '../../assets/icons/iEdicao.svg'
import FecharSVG from '../../assets/icons/iFechar.svg'
import AdicionarSVG from '../../assets/icons/iAdicionar.svg'
import LupaSVG from '../../assets/icons/iLupa.svg'
import TaskAltSVG from '../../assets/icons/iTaskAlt.svg'
import * as S from './hubCadastroPage.styles'
import { ContainerPage } from 'components/containerPage'

type FormData = Omit<CreateHubRequest, 'capacidade' | 'estadosAtendidos'> & {
  capacidade: string;
}

export const HubCadastroPage = () => {
  const navigate = useNavigate()
  const [estadosSelecionados, setEstadosSelecionados] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    capacidade: '',
    cep: '',
    estado: '',
    cidade: '',
    endereco: '',
    numero: '',
    complemento: ''
  })

  const handleInputChange = (field: keyof FormData, value: string | number | undefined) => {
    if (value !== undefined) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleAddEstado = () => {
    if (formData.estado && !estadosSelecionados.includes(formData.estado)) {
      setEstadosSelecionados([...estadosSelecionados, formData.estado])
      setFormData(prev => ({ ...prev, estado: '' }))
    }
  }

  const handleRemoveEstado = (estado: string) => {
    setEstadosSelecionados(estadosSelecionados.filter(e => e !== estado))
  }

  const handleConfirmar = async () => {
    try {
      await hubFormasService.criarHub({
        ...formData,
        capacidade: Number(formData.capacidade),
        estadosAtendidos: estadosSelecionados
      })
      navigate(rotas.HubFormas)
    } catch (error) {
      console.error('Erro ao criar hub:', error)
    }
  }

  return (
    <ContainerPage
      cabecalhoProps={{
        modoCadastro: true,
        aoClicarVoltar: () => navigate(-1),
      }}
    >
      <S.Content>
        <S.Content>
          <S.HeaderContainer>
            <Icone icone={EditarSVG} cor={cores.neutralDark} largura={24} altura={24} />
            <S.FormTitle>Cadastro de Hub</S.FormTitle>
          </S.HeaderContainer>

          <S.FormContainer>
            <S.Section>
              <S.SectionTitle>Descrição</S.SectionTitle>
              <S.StyledInput>
                <Input
                  valor={formData.nome}
                  aoDigitar={(valor) => handleInputChange('nome', valor)}
                  placeholder="Nome do Hub (obrigatório)"
                  corBorda={cores.background01}
                  corBordaFocada={cores.background01}
                  textoProps={{
                    estilo: 'semibold',
                    tamanho: 12,
                    alturalinha: 20
                  }}
                />
              </S.StyledInput>
              <S.StyledInput>
                <Input
                  valor={formData.descricao}
                  aoDigitar={(valor) => handleInputChange('descricao', valor)}
                  placeholder="Descrição (opcional)"
                  corBorda={cores.background01}
                  corBordaFocada={cores.background01}
                  textoProps={{
                    estilo: 'semibold',
                    tamanho: 12,
                    alturalinha: 20
                  }}
                />
              </S.StyledInput>
            </S.Section>

            <S.Section>
              <S.SectionTitle>Capacidade</S.SectionTitle>
              <S.StyledInput>
                <Input
                  valor={formData.capacidade}
                  aoDigitar={(valor) => handleInputChange('capacidade', valor)}
                  placeholder="Armazenamento de alumínio (m²) (obrigatório)"
                  tipo="numero"
                  corBorda={cores.background01}
                  corBordaFocada={cores.background01}
                  textoProps={{
                    estilo: 'semibold',
                    tamanho: 12,
                    alturalinha: 20
                  }}
                />
              </S.StyledInput>
            </S.Section>

            <S.Section>
              <S.SectionTitle>Localização</S.SectionTitle>
              <S.StyledInput>
                <Input
                  valor={formData.cep}
                  aoDigitar={(valor) => handleInputChange('cep', valor)}
                  placeholder="CEP (obrigatório)"
                  corBorda={cores.background01}
                  corBordaFocada={cores.background01}
                  textoProps={{
                    estilo: 'semibold',
                    tamanho: 12,
                    alturalinha: 20
                  }}
                />
              </S.StyledInput>

              <S.Row>
                <S.StyledInput>
                  <Input
                    valor={formData.estado}
                    aoDigitar={(valor) => handleInputChange('estado', valor)}
                    placeholder="Estado (obrigatório)"
                    corBorda={cores.background01}
                    corBordaFocada={cores.background01}
                    tipo="pesquisa"
                    icone={{
                      icone: LupaSVG,
                      cor: cores.neutralXDark
                    }}
                    textoProps={{
                      estilo: 'semibold',
                      tamanho: 12,
                      alturalinha: 20
                    }}
                  />
                </S.StyledInput>
                <S.StyledInput>
                  <Input
                    valor={formData.cidade}
                    aoDigitar={(valor) => handleInputChange('cidade', valor)}
                    placeholder="Cidade (obrigatório)"
                    corBorda={cores.background01}
                    corBordaFocada={cores.background01}
                    tipo="pesquisa"
                    icone={{
                      icone: LupaSVG,
                      cor: cores.neutralXDark
                    }}
                    textoProps={{
                      estilo: 'semibold',
                      tamanho: 12,
                      alturalinha: 20
                    }}
                  />
                </S.StyledInput>
              </S.Row>

              <S.StyledInput>
                <Input
                  valor={formData.endereco}
                  aoDigitar={(valor) => handleInputChange('endereco', valor)}
                  placeholder="Endereço (obrigatório)"
                  corBorda={cores.background01}
                  corBordaFocada={cores.background01}
                  textoProps={{
                    estilo: 'semibold',
                    tamanho: 12,
                    alturalinha: 20
                  }}
                />
              </S.StyledInput>

              <S.Row>
                <S.StyledInput>
                  <Input
                    valor={formData.numero}
                    aoDigitar={(valor) => handleInputChange('numero', valor)}
                    placeholder="Número (obrigatório)"
                    corBorda={cores.background01}
                    corBordaFocada={cores.background01}
                    textoProps={{
                      estilo: 'semibold',
                      tamanho: 12,
                      alturalinha: 20
                    }}
                  />
                </S.StyledInput>
                <S.StyledInput>
                  <Input
                    valor={formData.complemento}
                    aoDigitar={(valor) => handleInputChange('complemento', valor)}
                    placeholder="Complemento (opcional)"
                    corBorda={cores.background01}
                    corBordaFocada={cores.background01}
                    textoProps={{
                      estilo: 'semibold',
                      tamanho: 12,
                      alturalinha: 20
                    }}
                  />
                </S.StyledInput>
              </S.Row>
            </S.Section>

            <S.Section>
              <S.EstadosHeader>
                <S.SectionTitle>Estados atendidos</S.SectionTitle>
                <BotaoIcone 
                  icone={AdicionarSVG} 
                  cor={cores.brandPrimaryPure} 
                  altura={24}
                  largura={24}
                  aoClicar={handleAddEstado}
                />
              </S.EstadosHeader>
              <S.EstadosContainer>
                {estadosSelecionados.map((estado) => (
                  <S.EstadoPill key={estado}>
                    <Texto tamanho={12} estilo="semibold" cor={cores.neutralXXLight}>
                      {estado}
                    </Texto>
                    <BotaoIcone
                      icone={FecharSVG}
                      cor={cores.neutralXXLight}
                      largura={16}
                      altura={16}
                      aoClicar={() => handleRemoveEstado(estado)}
                    />
                  </S.EstadoPill>
                ))}
              </S.EstadosContainer>
            </S.Section>

            <S.ConfirmButton
              texto="Confirmar cadastro"
              aoClicar={handleConfirmar}
              icone={TaskAltSVG}
              textoProps={{
                tamanho: 16,
                estilo: 'semibold'
              }}
            />
          </S.FormContainer>
        </S.Content>
      </S.Content>
    </ContainerPage>
  )
}