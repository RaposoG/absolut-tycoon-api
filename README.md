# Absolut Tycoon API

## Descrição

Esta é a API back-end para o jogo Absolut Tycoon. Inspirado em jogos de estratégia e gerenciamento online como OGame, o Absolut Tycoon será um jogo 100% online onde os jogadores precisarão se autenticar para interagir com o universo do jogo. A API é responsável por gerenciar a lógica do jogo, dados dos jogadores, autenticação e interações.

## Funcionalidades Principais (Planejadas)

*   **Autenticação de Usuários:** Sistema seguro de registro e login usando JWT (JSON Web Tokens).
*   **Gerenciamento de Recursos:** Lógica para acúmulo, gasto e troca de recursos no jogo.
*   **Construção e Evolução:** Sistema para construção de edifícios, pesquisa de tecnologias e desenvolvimento de frotas/unidades.
*   **Interações entre Jogadores:** Funcionalidades para combate, comércio, alianças, etc. (a definir).
*   **Persistência de Dados:** Utilização do Prisma ORM para salvar e gerenciar o estado do jogo e dos jogadores em um banco de dados.

## Tecnologias Utilizadas

*   **Framework:** Fastify (Node.js)
*   **Linguagem:** TypeScript
*   **Banco de Dados:** (Definido pelo Prisma - ex: PostgreSQL, MySQL, SQLite)
*   **ORM:** Prisma
*   **Validação:** Zod
*   **Autenticação:** `@fastify/jwt`
*   **Documentação da API:** `@fastify/swagger`, `@fastify/swagger-ui`
*   **Variáveis de Ambiente:** `dotenv`, Zod para validação
*   **Build:** tsup
*   **Desenvolvimento:** tsx (para hot-reloading)

## Estrutura do Projeto

```
src/
├── @types/         # Definições de tipos globais (ex: extensões do Fastify)
│   └── fastify.d.ts
├── env/            # Configuração e validação das variáveis de ambiente
│   └── index.ts
├── lib/            # Módulos reutilizáveis (ex: instância do Prisma)
│   └── prisma.ts
├── middlewares/    # Middlewares da aplicação (ex: verificação de autenticação)
│   └── auth.ts
├── routes/         # Definição das rotas da API
│   ├── _errors/    # (Potencialmente para erros específicos das rotas)
│   └── auth/       # Rotas relacionadas à autenticação (signup, signin)
│       ├── index.ts
│       ├── auth.ts
│       ├── sign-in.ts
│       └── sign-up.ts
│   └── ...         # Outras rotas do jogo (ex: /planets, /buildings, /fleet)
├── error-handler.ts # Handler global de erros
└── server.ts       # Ponto de entrada da aplicação, configuração do Fastify e inicialização
```

## Pré-requisitos

*   Node.js (versão recomendada no `.nvmrc` ou a mais recente LTS)
*   pnpm (ou npm/yarn)
*   Um banco de dados suportado pelo Prisma (ex: PostgreSQL) rodando.

## Instalação

1.  Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    cd absolut-tycoon-api
    ```
2.  Instale as dependências:
    ```bash
    pnpm install
    ```
3.  Configure as variáveis de ambiente:
    *   Copie o arquivo `.env.example` (se existir) para `.env`.
    *   Preencha as variáveis no arquivo `.env`, especialmente a `DATABASE_URL` e `SECRET_JWT`.
    ```bash
    cp .env.example .env
    # Edite o .env com suas configurações
    ```
4.  Execute as migrações do Prisma para criar as tabelas no banco de dados:
    ```bash
    pnpm prisma migrate dev
    ```
    (Use `pnpm prisma migrate deploy` para ambientes de produção)
5.  Gere o Prisma Client:
    ```bash
    pnpm prisma generate
    ```

## Rodando a API

*   **Modo de Desenvolvimento (com hot-reload):**
    ```bash
    pnpm dev
    ```
    O servidor estará disponível nos endereços de rede locais informados no console (ex: `http://localhost:PORTA`, `http://192.168.X.X:PORTA`).

*   **Modo de Produção:**
    1.  Faça o build da aplicação:
        ```bash
        pnpm build
        ```
    2.  Inicie o servidor:
        ```bash
        pnpm start
        ```

## Documentação da API

A documentação da API é gerada automaticamente usando Swagger e está disponível na rota `/docs` quando o servidor está rodando.

Exemplo: `http://localhost:PORTA/docs`

## Como Contribuir

(Seção a ser definida, caso o projeto seja aberto a contribuições. Pode incluir informações sobre convenções de código, fluxo de pull requests, etc.)
