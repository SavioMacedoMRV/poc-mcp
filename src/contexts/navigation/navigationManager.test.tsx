import '@testing-library/jest-dom'
import React, {ReactNode} from 'react'
import {render} from '@testing-library/react'
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {NavigationManager} from './navigationManager'

const NavigationWrapper = ({children}: {children?: ReactNode}) => {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: (
        <NavigationManager>
          <Outlet />
        </NavigationManager>
      ),
      children: [
        {
          index: true,
          element: children,
        },
        {
          path: '/path',
          element: <div>Path</div>,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

describe('NavigationManager', () => {
  test('DEVE disparar o evento [mf-template - navegação] ao navegar entre as rotas', () => {
    window.dispatchEvent = jest.fn()

    const ChildMock = () => (
      <div data-testid="child">Componente Filho Mockado</div>
    )

    render(<ChildMock />, {
      wrapper: NavigationWrapper,
    })

    window.history.pushState({}, '', '/path')

    const eventoEsperado = new CustomEvent('[mf-template - navegação]', {
      detail: '/path',
    })
    expect(window.dispatchEvent).toHaveBeenCalledWith(eventoEsperado)
  })
})
