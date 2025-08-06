# Amazon Scraper

## Objetivo:  
#### Criar um script simples para extrair listagens de produtos da Amazon da primeira página de resultados de pesquisa para uma determinada palavra-chave.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/) (para rodar o backend)
- [npm](https://www.npmjs.com/) (para rodar o frontend e scripts)
- [`concurrently`](https://www.npmjs.com/package/concurrently) (já instalado como dependência de desenvolvimento)

## Instalação

1. Clone o repositório e acesse a pasta do projeto:
```
            git clone <url-do-repositorio>
            cd <nome-da-pasta>
```

2.	Instale as dependências na raiz do projeto:
```
    npm install
```
3.	Instale as dependências do backend:
```
            cd amazon-scraper-backend
            bun install
            cd ..
```
4.	Instale as dependências do frontend:
```
            cd amazon-scraper-frontend
            npm install
            cd ..
```

## Rodando o projeto
#### Para rodar backend e frontend juntos em um único terminal, execute na raiz do projeto:
```
            npm run dev
```

* O backend será iniciado na porta 3000.
* O frontend será iniciado na porta 5173.
* Acesse o frontend em (http://localhost:5173).

## Scripts disponíveis
* npm run dev: Inicia backend e frontend juntos.
* Para rodar separadamente:
   * Backend:
   ```
            cd amazon-scraper-backend
            bun index.js
   ```
   * Frontend:
   ```
            cd amazon-scraper-frontend
            npm run dev
  ```
