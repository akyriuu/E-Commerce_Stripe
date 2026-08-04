# E-commerce

Vitrine.br - E-commerce is a clean marketplace experience built with modern TypeScript tooling. It combines a NestJS backend with a Next.js frontend to deliver a small seller dashboard, public product listings, and Stripe-powered checkout.

## What this project does

This project models a compact digital marketplace for product creators and buyers.

- Sellers can register, log in, publish products, update items, and delete products.
- The public storefront lists published products with shareable product pages.
- Buyers can visit a product page and complete checkout via Stripe.
- Sales counts are updated automatically when Stripe confirms a successful purchase.

## Why this project exists

The goal is to demonstrate a simple market-pattern application with a clean interface and end-to-end flow:

- user authentication for creators
- product management and publication
- public share links for marketing
- a minimal checkout experience
- a backend API that supports both web listing and secure seller operations

## Architecture and stack

### Backend

- NestJS: structure, modules, controllers, and dependency injection
- Prisma: strongly typed database access
- PostgreSQL: relational product and user storage
- JWT authentication: secure protected routes for seller actions
- Stripe Checkout + webhook: payment flow and sale tracking

### Frontend

- Next.js: server-rendered routes and a responsive app structure
- React + TypeScript: typed UI components and hooks
- Tailwind CSS: simple utility-driven styling
- API integration: product listing, auth, product CRUD, and checkout

## Core features

### Product management

- Create new products with title, description, price, and optional image
- Update or remove products from the seller dashboard
- View only your own products behind authentication
- Publicly share product links for buyers

### Public storefront

- Home page lists published products
- Each product displays price, sales count, and share link
- Product share page shows a focused purchase experience

### Payments

- Checkout uses Stripe Checkout sessions
- Webhook processing updates `salesCount` once payment is confirmed
- Buyer flow remains simple and trustable

### Interface design

The app focuses on a clean, marketplace-like pattern:

- Dashboard for product creators
- Minimal product cards for discovery
- Clear call-to-action buttons for purchase and sharing
- Lightweight, readable presentation on both list and detail pages

## What is being demonstrated

This repository is a strong example of how to wire a modern full-stack app:

- clear separation of API and UI responsibilities
- typed data shapes shared across client and server
- secure resource ownership with JWT guards
- integration of payment workflows in a maintainable backend
- a lightweight product publishing workflow for marketplace content

## Why this is useful

This project is ideal as a starter or demonstration app for:

- marketplace MVPs
- seller/product listing flows
- Stripe checkout integration
- NestJS + Next.js full-stack architecture
- clean admin dashboards with public-facing share links

## Project structure

- `api/` — backend service with NestJS controllers, services, Prisma, and payments
- `web/` — Next.js front-end with product pages, dashboard, login, and public sharing
- `api/docker-compose.yml` — database bootstrap for local PostgreSQL development

## Tech keywords

NestJS · Next.js · TypeScript · Prisma · PostgreSQL · Stripe · JWT · React · Tailwind CSS

---

# E-commerce (Português)

Vitrine.br - E-commerce é uma experiência de marketplace limpa construída com ferramentas modernas de TypeScript. Combina um backend NestJS com um frontend Next.js para fornecer um pequeno painel de vendedor, listagem pública de produtos e checkout com Stripe.

## O que este projeto faz

Este projeto modela um marketplace digital compacto para criadores de produtos e compradores.

- Vendedores podem se registrar, fazer login, publicar produtos, atualizar itens e excluir produtos.
- A vitrine pública lista produtos publicados com páginas de produto compartilháveis.
- Compradores podem visitar a página de um produto e concluir o checkout via Stripe.
- Contagens de vendas são atualizadas automaticamente quando o Stripe confirma uma compra concluída.

## Por que este projeto existe

O objetivo é demonstrar uma aplicação com padrão de marketplace simples e interface limpa com fluxo completo:

- autenticação de usuário para criadores
- gerenciamento e publicação de produtos
- links públicos compartilháveis para divulgação
- experiência de checkout mínima
- uma API de backend que suporta listagem web e operações seguras de vendedor

## Arquitetura e stack

### Backend

- NestJS: estrutura, módulos, controllers e injeção de dependência
- Prisma: acesso ao banco fortemente tipado
- PostgreSQL: armazenamento relacional de produtos e usuários
- Autenticação JWT: rotas protegidas para ações do vendedor
- Stripe Checkout + webhook: fluxo de pagamento e rastreamento de vendas

### Frontend

- Next.js: rotas renderizadas no servidor e estrutura responsiva
- React + TypeScript: componentes e hooks tipados
- Tailwind CSS: estilo utilitário simples
- Integração com API: listagem de produtos, auth, CRUD de produtos e checkout

## Recursos principais

### Gerenciamento de produtos

- Criar novos produtos com título, descrição, preço e imagem opcional
- Atualizar ou remover produtos no painel do vendedor
- Ver apenas seus próprios produtos atrás de autenticação
- Compartilhar links públicos de produtos para compradores

### Vitrine pública

- A página inicial lista produtos publicados
- Cada produto exibe preço, contagem de vendas e link para compartilhar
- A página de compartilhamento de produto mostra uma experiência de compra focada

### Pagamentos

- Checkout usa sessões do Stripe Checkout
- O processamento do webhook atualiza `salesCount` após confirmação de pagamento
- O fluxo do comprador permanece simples e confiável

### Design da interface

O app foca em um padrão de marketplace limpo:

- Painel para criadores de produtos
- Cards de produto mínimos para descoberta
- Botões de ação claros para compra e compartilhamento
- Apresentação leve e legível em páginas de lista e detalhe

## O que está sendo demonstrado

Este repositório é um bom exemplo de como conectar um app full-stack moderno:

- separação clara entre responsabilidades de API e UI
- formatos de dados tipados compartilhados entre cliente e servidor
- propriedade segura de recursos com guards JWT
- integração de fluxo de pagamento em um backend fácil de manter
- fluxo leve de publicação de produtos para conteúdo de marketplace

## Por que isso é útil

Este projeto é ideal como app inicial ou de demonstração para:

- MVPs de marketplace
- fluxos de listagem de vendedor/produto
- integração de checkout Stripe
- arquitetura full-stack NestJS + Next.js
- painéis administrativos limpos com links públicos de compartilhamento

## Estrutura do projeto

- `api/` — serviço backend com controllers NestJS, services, Prisma e pagamentos
- `web/` — frontend Next.js com páginas de produto, painel, login e compartilhamento público
- `api/docker-compose.yml` — bootstrap do banco PostgreSQL local

## Palavras-chave

NestJS · Next.js · TypeScript · Prisma · PostgreSQL · Stripe · JWT · React · Tailwind CSS
