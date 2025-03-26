import React from 'react'
import {
  LoaderFunctionArgs,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
  defer,
  Navigate,
} from 'react-router-dom'
import {HomePage} from 'pages/home'
import {rotas} from 'resources/rotas'
import {Carregando} from 'components/carregando'
import {MfTemplate} from 'types/interfaces'
import {NavigationManager} from 'contexts/navigation'
import {GerenciadorStorage} from 'infrastructure/storage'
import {OutraPaginaPage} from 'pages/outraPagina'
import {obterDadoApi} from 'services/dadoApi'
import {HubFormasPage, HubFormasDetalhePage} from 'pages/hubFormas'
import {hubFormasApi} from 'services/hubFormasApi'

interface WebRoutesProps {
  rootLocal?: boolean
  rotaInicial?: string
  params: MfTemplate
}

export const WebRoutes = ({
  rootLocal,
  rotaInicial,
  params,
}: Readonly<WebRoutesProps>) => {
  if (
    rootLocal &&
    process.env.NODE_ENV &&
    ['development', 'test'].includes(process.env.NODE_ENV) &&
    params.auth &&
    params.obra
  ) {
    GerenciadorStorage.salvarToken(params.auth)
    GerenciadorStorage.salvarObra(params.obra)
  }

  const routes: RouteObject[] = [
    {
      id: 'root-template',
      path: rotas.Home,
      loader: hostDataLoader,
      element: (
        <NavigationManager>
          <Outlet />
        </NavigationManager>
      ),
      children: [
        {
          index: true,
          element: <Navigate to={rotas.HubFormas} replace />,
        },
        {
          path: 'home',
          Component: HomePage,
          loader: homePageLoader,
        },
        {
          path: `${rotas.OutraPagina}/:id`,
          Component: OutraPaginaPage,
          loader: OutraPaginaPageLoader,
        },
        {
          path: rotas.HubFormas,
          Component: HubFormasPage,
          loader: hubFormasPageLoader,
        },
        {
          path: `${rotas.HubFormasDetalhe}/:id`,
          Component: HubFormasDetalhePage,
          loader: hubFormasDetalhePageLoader,
        }
      ],
    },
  ]

  function createRouter() {
    if (rootLocal) {
      return createBrowserRouter(routes)
    }

    const initialEntries = [rotaInicial ?? '/']
    return createMemoryRouter(routes, {initialEntries: initialEntries})
  }

  return (
    <RouterProvider router={createRouter()} fallbackElement={<Carregando />} />
  )

  async function hostDataLoader() {
    return {obra: params.obra}
  }

  async function homePageLoader() {
    return {
      info: 'Tudo certo por aqui!',
    }
  }

  async function OutraPaginaPageLoader({params}: LoaderFunctionArgs) {
    const dadoPromise = obterDadoApi({
      id: params.id!,
    })

    return defer({
      data: dadoPromise,
    })
  }

  async function hubFormasPageLoader() {
    return {
      status: 'Disponível',
    }
  }

  async function hubFormasDetalhePageLoader({params}: LoaderFunctionArgs) {
    const dataPromise = hubFormasApi.obterFormulario(params.id!)
    return defer({
      data: dataPromise,
    })
  }
}
