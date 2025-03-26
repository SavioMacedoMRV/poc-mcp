import React from 'react'
import {cores} from 'resources/cores'

export interface IconeProps extends React.FC<React.SVGProps<SVGSVGElement>> {
  icone?: React.FC<React.SVGProps<SVGSVGElement>>
  cor?: string
  inclinacao?: number
  altura?: number
  largura?: number
}

export const Icone = ({
  icone: Icone,
  altura = 32,
  largura = altura,
  inclinacao = 0,
  cor = cores.neutralDark,
  ...props
}: Readonly<IconeProps>) => {
  return (
    Icone && (
      <Icone
        fill={cor}
        width={largura}
        height={altura}
        style={{
          minWidth: `${largura}px`,
          minHeight: `${altura}px`,
          maxWidth: `${largura}px`,
          maxHeight: `${altura}px`,
          transform: `rotate(${inclinacao}deg)`,
        }}
        {...props}
      />
    )
  )
}
