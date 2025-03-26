import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Texto } from 'components/texto'
import { rotas } from 'resources/rotas'
import styled from 'styled-components'
import BlocoSVG from 'icons/iBloco.svg'
import iSeta from 'icons/iSeta.svg'
import { Icone } from 'components/icone'

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 100%;
  text-align: left;
  transition: background-color 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: #EDF2F0;
  }
`

const Divider = styled.div`
  height: 2px;
  background: #EDF2F0;
  width: 100%;
`

const StyledIcone = styled(Icone)`
  path {
    fill: #434645;
  }
`

export const MenuNavegacao = () => {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Hubs', icon: BlocoSVG, route: rotas.HubFormas },
    { label: 'Obras', icon: iSeta, route: rotas.OutraPagina },
    { label: 'Fornecedores', icon: BlocoSVG, route: rotas.Home },
    { label: 'Peças', icon: BlocoSVG, route: rotas.Home }
  ]

  return (
    <>
      {menuItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <MenuItem onClick={() => navigate(item.route)}>
            <StyledIcone icone={item.icon} altura={24} largura={24} />
            <Texto 
              tamanho={12} 
              estilo="semibold" 
              cor="#434645"
              alturalinha={20}
            >
              {item.label}
            </Texto>
          </MenuItem>
          {index < menuItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </>
  )
}