# Copilot Instructions for Portal360 Frontend Micro Applications

## Introduction

This document provides instructions for creating a new micro frontend application for Portal360. The application structure will be based on the Portal360Web-Abastecimento project template, but it's crucial to understand that **all existing components, resources, and infrastructure MUST BE PRESERVED**. When using this template:

- DO NOT modify existing components or resources
- DO NOT recreate existing functionality
- DO use the existing components as building blocks
- DO preserve folder structure and naming conventions

The goal is to ensure consistency across all Portal360 micro frontends while maintaining the integrity of the core components and design system.

## Important Notes

- **PRESERVE ALL EXISTING CODE** - Do not modify any existing files
- **USE EXISTING COMPONENTS** - They are part of the Portal360 design system and should be used as-is
- **MAINTAIN RESOURCES** - Files like cores.ts, fonts.ts, etc. define the Portal360 theme and must remain unchanged
- **KEEP INFRASTRUCTURE** - Use existing authentication, api, and storage setups without modification
- **FOLLOW PATTERNS** - Add new files following the established folder structure and naming conventions
- **ADD, DON'T MODIFY** - Create new business-specific components and features without altering existing ones

## Getting Started

1. Start with the existing codebase
2. Add your own pages and features
3. Use the existing components and infrastructure
4. Add only business-specific code and components

## Prerequisites

- Node.js (>= 18.x)
- Git
- Visual Studio Code
- npm or yarn
- Access to MRV's npm registry

## Using Existing Components and Resources

### Core Components (PRESERVE AS-IS)

The following components are part of the Portal360 design system and must be used without modification:

- Botao
- BotaoIcone
- BotaoMenu
- Cabecalho
- Carregando
- ComponenteErro
- ContainerPage
- Icone
- Input
- ModalConfirmacao
- Snackbar
- Texto

### Resources (PRESERVE AS-IS)

These resources define the Portal360 theme and must remain unchanged:

- cores.ts
- fontes.ts
- margens.ts
- media.ts
- rotas.ts

### Infrastructure (PRESERVE AS-IS)

Reuse these infrastructure components without modification:

- api/
- logs/
- storage/
- authentication/

## Creating New Features

When adding new functionality, remember to:

1. Create new pages in src/pages/ **without modifying existing ones**
2. Add new routes to web.routes.tsx **alongside existing routes**
3. Create new business-specific components in src/components/ **without changing existing ones**
4. Add new business-specific contexts in src/contexts/ **separate from existing contexts**
5. Use existing components as building blocks for UI elements

Example of creating a new page:

```typescript
// src/pages/minhaNovaPage/minhaNovaPage.tsx
import { ContainerPage } from '@/components/containerPage'
import { Cabecalho } from '@/components/cabecalho'
import { Texto } from '@/components/texto'

export const MinhaNovaPage = () => {
  return (
    <ContainerPage>
      <Cabecalho titulo="Minha Nova Página" />
      <Texto>Conteúdo da página</Texto>
    </ContainerPage>
  )
}
```

## API Integration

Use the existing API client and add your endpoints:

```typescript
// Add new API calls in a new service file
// src/services/meuServico/meuServico.service.ts
import api from '@/infrastructure/api'

export const meuServicoApi = {
  obterDados: () => api.get('/meu-endpoint'),
  enviarDados: (data: any) => api.post('/meu-endpoint', data),
}
```

## State Management

Create new contexts for your business logic:

```typescript
// src/contexts/meuContexto/meuContexto.tsx
import { createContext, useContext, useReducer } from 'react'

// Add your context implementation
```

## Development Guidelines

1. Component Development
- Use existing Portal360 components whenever possible
- Create new components only for business-specific needs
- Follow the established component structure

2. State Management
- Use existing authentication and navigation contexts
- Create new contexts only for business-specific state
- Follow the established patterns

3. Testing
- Write tests for new components and features
- Follow existing test patterns and naming conventions
- Use the established test utilities

4. Error Handling
- Use existing error boundaries
- Follow established error logging patterns
- Use existing notification system

## Documentation

1. Document new components following the existing pattern
2. Update README.md with:
- Project-specific setup
- Business domain description
- New features documentation
- Custom configurations

## Best Practices

1. Preserve Existing Components:
```typescript
// Good - Use existing components as-is
import { Botao } from '@/components/botao'
import { Texto } from '@/components/texto'
const MinhaPage = () => (
  <Botao aoClicar={handleClick}>
    <Texto>Meu Texto</Texto>
  </Botao>
)

// Bad - Don't modify or recreate existing components
const BotaoModificado = styled(Botao)`...` // Don't do this
const MeuBotao = styled.button`...` // Don't do this
```

2. Preserve Existing Theme:
```typescript
// Good - Use existing theme resources
import { cores } from '@/resources/cores'
import { margens } from '@/resources/margens'
const styles = {
  color: cores.primaria,
  margin: margens.small
}

// Bad - Don't create new theme variables
const novasCores = { // Don't do this
  primaria: '#123456'
}
```

3. Preserve File Structure:
```typescript
// Good - Follow existing patterns without modification
/components/meuNovoComponente/ // New components only
  ├── index.ts
  ├── meuNovoComponente.tsx
  ├── meuNovoComponente.styles.ts
  └── meuNovoComponente.test.tsx

// Bad - Don't modify existing components
/components/botao/ // Don't modify existing components
  ├── botao.tsx // Don't change this
```

## Creating New Files

When adding new files:

1. Pages:
```
src/pages/minhaFeature/
├── index.ts
├── minhaFeature.tsx
├── minhaFeature.styles.ts
└── minhaFeature.test.tsx
```

2. Components:
```
src/components/meuComponente/
├── index.ts
├── meuComponente.tsx
├── meuComponente.styles.ts
└── meuComponente.test.tsx
```

3. Services:
```
src/services/meuServico/
├── index.ts
├── meuServico.service.ts
└── meuServico.test.ts
```

## Conclusion

Key points to remember:
- **NEVER modify existing components or resources**
- **ALWAYS use existing components as-is**
- **PRESERVE all infrastructure and utilities**
- **ADD new features without changing existing ones**
- **MAINTAIN design system consistency**
- Add only business-specific code
- Follow established patterns strictly

Remember that the goal is to build upon the existing foundation while maintaining its integrity. Think of the existing components and resources as a locked design system that provides the building blocks for your application.