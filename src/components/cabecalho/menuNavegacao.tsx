import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Texto } from 'components/texto'
import { rotas } from 'resources/rotas'
import styled from 'styled-components'
import BlocoSVG from 'icons/iBloco.svg'
import iSeta from 'icons/iSeta.svg'
import { Icone } from 'components/icone'
import { cores } from 'resources/cores'

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  transition: background-color 0.2s;
  border-radius: 8px;
  min-height: 40px;

  &:hover {
    background-color: ${cores.background01};
  }
`

const Divider = styled.div`
  height: 1px;
  background: ${cores.background01};
  width: 100%;
  margin: 4px 0;
`

const StyledIcone = styled(Icone)`
  path {
    fill: ${cores.neutralXDark};
  }
  flex-shrink: 0;
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
            <StyledIcone icone={item.icon} altura={20} largura={20} />
            <Texto 
              tamanho={12} 
              estilo="semibold" 
              cor={cores.neutralXDark}
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