import('./bootstrap').then(({mount}) => {
  let params = {}
  const rootMountPoint = document.getElementById('root')

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    params = {
      auth: {
        accessToken: process.env.AUTH_ACCESS_TOKEN,
        idToken: process.env.AUTH_ID_TOKEN,
      },
      obra: {
        id: process.env.OBRA_ID,
        nome: process.env.OBRA_NOME,
      },
    }
  }

  mount({
    mountPoint: rootMountPoint!,
    rootLocal: true,
    params,
  })
})

export {}
