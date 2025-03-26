<br />
<p align="center">
  <img src="https://logodownload.org/wp-content/uploads/2018/07/mrv-logo-6-1.png" alt="Logo" width="auto" height="80">

  <h1 align="center">Portal 360 Web - Template</h1>
</p>

## Selos de Qualidade SonarCloud

Adicionar widgets do Sonar quando for criado!

[[_TOC_]]

# Introdução

Portal 360 - Template: Microfrontend a ser consumido no [Portal 360](https://portal360.mrv.com.br).

## Setup

- Ferramentas necessárias:
  - Visual Studio Code
  - Git
  - Node (>= 20)
  - React (18.2)
  - Typescript
  - Prettier (plugin do VSCode recomendado)
  - ESLint (plugin do VSCode recomendado)

## Configurações necessárias para substituir o template em um contexto real

1. Configurar o arquivo **azure-pipelines.yml**

   - Trocar variáveis na task do Sonar (SonarCloudPrepare@2)
   - Trocar variáveis na task de Replace (EnvTransform@0)
   - Trocar o nome do artefato zip na task Archive (ArchiveFiles@2)
   - Escolher a Task para publicação etrocar as variáveis na task do Deploy (AzureWebApp@1 ou AzureRmWebAppDeployment@4)

2. Trocar o name do projeto no arquivo **package.json**

3. Trocar as variáveis do ModuleFederationPlugin no arquivo **webpack.config.json**

4. Trocar a tag env.tags['ai.cloud.role'] no arquivo **applicationInsights.service.ts**

5. Trocar o identificador de evento de navegação no arquivo **navigationManager.tsx**

6. Trocar as variáveis que apontam para a palavra template e substituir para o contexto real no arquivo **readME.md**

## Executar o projeto na máquina local

Para excecução local da aplicação, siga as instruções abaixo:

1. #### Configurar variaveis de ambiente

   Adicionar o arquivo `.env` dentro da pasta raiz do projeto.\
   Incluir todas as variáveis de ambiente necessárias para a compilação.\

   ```.env
   #/.env

   API_BASE_URL=http://localhost:5002              # Valor padrão para .env de desenvolvimento
   API_PATH=api                                    # Valor padrão para .env de desenvolvimento
   APP_INSIGHTS_CONNECTION="InstrumentationKey=''" # Valor padrão para .env de desenvolvimento

   AUTH_ACCESS_TOKEN = access_token                # Apenas para .env de desenvolvimento
   AUTH_ID_TOKEN = id_token                        # Apenas para .env de desenvolvimento

   OBRA_ID = id_empreendimento                     # Apenas para .env de desenvolvimento
   OBRA_NOME = obra                                # Apenas para .env de desenvolvimento
   ```

2. #### Executar o comando `npm install`

   Instala os pacotes e dependências necessárias do projeto.

3. #### Executar o comando `npm start`
   O projeto será executado em modo de desenvolvimento.\
   O mesmo poderá ser acessado pelo navegador em: [http://localhost:3002](http://localhost:3002).\
   O servidor de desenvolvimento será executado em: [http://localhost:5002](http://localhost:5002).\
   A página em exibição será recarregada após salvar edições no código.\
   Erros de compilação serão exibidos no console.

## Executar os testes

### `npm test`

Executa todos os testes da aplicação.

### `npm run test:coverage`

Executa todos os testes da aplicação e exibe o relatório detalhado da cobertura de código.

## Executar o build

### `npm run build`

Executa o build da aplicação para o ambiente de produção, esta ação consome as variáveis de ambiente configuradas em `.env.prod`.\
O resultado da compilação pode ser visualizado na pasta `/dist`.

### `npm run build:qa`

Executa o build da aplicação para o ambiente de QA, esta ação consome as variáveis de ambiente configuradas em `.env.qa`.\
O resultado da compilação pode ser visualizado na pasta `/dist`.

## Outros comandos

### `npm run lint`

Executa as validações dos ESLint para todos os arquivos do projeto.

### `npm run format`

Executa as validações do Prettier configuradas para o projeto e aplica as correções de formatação.

## Branches

### Branch principal:

- **[main](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_git/Portal360Web-Template)**

### Regras para novos desenvolvimentos:

- _feature/[nome-da-tarefa]_ Para trabalhos relacionados a uma estória com apenas uma tarefa, derivar a branch a partir da **_main_**, com nome relacionado (Ex.: _feature/ajuste-cabecalho_).

- _feature/[nome-da-feature]/main_ - Para trabalhos com multiplas tarefas relacionados a uma estória, derivar a branch a partir da **_main_** com nome relacionado (Ex.: _feature/selecao-obra/main_).

- _feature/[nome-da-feature]/[nome-da-tarefa]_ Para trabalhos relacionados a uma tarefa de uma estória com múltiplas tarefas, derivar a branch a partir da **_feature/main_**, com nome relacionado (Ex.: _feature/selecao-obra/tela-obras_).

- _hotfix/[nome-da-correcao]_ - Para trabalhos relacionados à correção de um bug/problema em produção, derivar a branch a partir da **_main_** com nome relacionado (Ex.: _hotfix/correcao-uri-api_).

O time poderá sugerir mudanças nessas regras periodicamente.\
Em casos específicos, o time poderá decidir utilizar uma regra diferente.

## Variávies de ambiente

Todas as variávies de ambiente utilizadas na aplicação ficam nos arquivos `.env`. São eles:

```text
.env -> ambiente local
.env.qa -> ambiente de qa
.env.prod -> ambiente de prod
```

O arquivo `.env` é o único arquivo ignorado pelo git.

### Criação de uma nova variável de ambiente

Para criar um nova variável de ambiente é necessário criá-la em todos os arquivos `.env`, porém o somente o arquivo `.env` do ambiente local precisa ter o valor da sua variável. Os demais arquivos terão um placeholder que será alterado durante a execução do CI da aplicação.

Exemplo:

```.env
#/.env

MINHA_VARIAVEL=valor_da_minha_variavel
```

```.env
#/.env.qa

MINHA_VARIAVEL=minha_variavel_qa
```

```.env
#/.env.prod

MINHA_VARIAVEL=minha_variavel_prod
```

Sempre que uma variável é alterada ou adicionada é necessário reiniciar a execução ou o build.\
Em seguida é preciso alterar o arquivo [azure-pipelines.yml](/azure-pipelines.yml) para adicionar as novas variáveis de ambientes que precisam ser transformadas durante o CI.

Os serviços (jobs) que precisam ser alterados são:

1. **Build_QA**
2. **Build_PROD**

Em todos esses serviços é preciso alterar o content da tarefa (task) **_EnvTransform@0_** para adicionar a nova variável.

```yml
#/azure-pipelines.yml
#...
- task: EnvTransform@0
    displayName: 'Transforma variaveis do .env.qa'
    inputs:
        inputType: 'inline'
        content: |
            APP_INSIGHTS_CONNECTION=$(APP_INSIGHTS_CONNECTION_QAS)
            MINHA_VARIAVEL=$(MINHA_VARIAVEL_QAS)
#...
```

O valor _`$(MINHA_VARIAVEL_QAS)`_ precisa ser definida no AzureDevops da MRV na library **_[KVEXECUCAOSERVICOS-QAS](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=278&path=KVEXECUCAOSERVICOS-QAS)_**.\
O valor _`$(MINHA_VARIAVEL_PRD)`_ precisa ser definida no AzureDevops da MRV na library **_[KVEXECUCAOSERVICOS-PRD](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=298&path=KVEXECUCAOSERVICOS-PRD)_**.

## Publicação da aplicação no ambiente QAS

Para publicar a aplicação é necessário seguir os seguintes passos:

1. Criar um [Pull Request](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_git/Portal360Web-Template/pullrequests?_a=active) da branch contendo as alterações para a branch _`main`_, devendo atender os seguintes critérios.

   - Associar tarefa da _Sprint_ relacionada ao desenvolvimento
   - Aprovação de no mínimo _UM_ revisor de código
   - Sucesso na execução do CI (ESLint, testes e build)
   - Resolver comentários e _code smells_ apontados pelo _SonarCloud_
   - completar com **squash**

2. Aprovar a publicação em QAS do [pipeline Portal360Web-Template](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_build?definitionId=2571).

## Publicação da aplicação no ambiente PRD

Para publicar a aplicação é necessário seguir os seguintes passos:

1. Criar um [Pull Request](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_git/Portal360Web-Template/pullrequests?_a=active) da branch contendo as alterações para a branch _`main`_, devendo atender os seguintes critérios.

   - Associar tarefa da _Sprint_ relacionada ao desenvolvimento
   - Aprovação de no mínimo _UM_ revisor de código
   - Sucesso na execução do CI (ESLint, testes e build)
   - Resolver comentários e _code smells_ apontados pelo _SonarCloud_
   - completar com **squash**

2. Aprovar a publicação em QAS do [pipeline Portal360Web-Template](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_build?definitionId=2571).

3. Abrir RDM para aprovar a publicação em produção do [pipeline Portal360Web-Template](https://dev.azure.com/mrvengenharia/Ecossistema%20Produ%C3%A7%C3%A3o/_build?definitionId=2571).
