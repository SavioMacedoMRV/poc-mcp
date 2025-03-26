import {ReactElement, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

interface NavigationManagerContextProps {
  children: ReactElement
}

export const NavigationManager = ({
  children,
}: Readonly<NavigationManagerContextProps>) => {
  const location = useLocation()

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('[mf-template - navegação]', {detail: location.pathname}),
    )
  }, [location])

  return children
}
