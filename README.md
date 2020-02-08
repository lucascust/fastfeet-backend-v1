<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/top/lucascust/fastfeed-backend-transportadora?color=%2304D361">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
  <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/70c8e79c83b442278f6c276ebf117ae4.svg">
  <img alt="node" src="https://img.shields.io/node/v/yarn">
</p>


<h1 align="center"> Backend da Transportadora Fastfeed </h1>

<h4 align="center">Fastfeed é uma empresa fictícia, o projeto foi elaborado em prol do aprendizado. </h4>


<p align="center">
  <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades-e-tecnologias">Funcionalidades e Tecnologias</a>
</p>

## Sobre

O software é uma API para uma transportadora, no qual o usuário pode gerenciar seus dados e informações do remetente. Ferramenta destinada apenas aos destinatários.

**Palavras-chave: NodeJS, API Rest, Arquitetura MVC, Docker, Express, Assincronismo, Sequelize, PostgreSQL.**


## Funcionalidades e Tecnologias

A API realiza uma interface simples, porém completa com as necessidades básicas de uma aplicação. Contando com cadastro, autenticação de usuário, segurança de senha e gerenciamento de banco de dados.

### 1. Estrutura
#### **Banco de dados:**
  - **Sequelize** (ORM) utilizada para representar bancos de dados relacionais como objetos, simplificando comandos em SQL em métodos intuitivos. essa API é baseada em objetos de processamento assíncrono (*promises*), no qual permite a continuidade do código mesmo ao aguardar uma resposta de um requisição, evitando gargalos. Emprega também a técnica de "lazy loading", obtendo ganho de desempenho pelo carregamento tardio de objetos quando ainda não são necessários.
  - **Docker** introduzido na aplicação de forma simples, isolando o banco de dados **Postgree** em um container, a fim de não permitir que o mesmo cause modificações nocivas à outras partes da API.

#### **Código**:
  - **Sucrase** permite a utilização de especificações mais recentes da linguagem, que ainda não são nativamente suportadas pelo *Node*.
  - **editorconfig** usado para manter um estilo consistente de codificação em caso de multiplos desenvolvedores integrando a aplicação.
  - **ESLint + Prettier** -- AirBnB Style -- configurados para auto-ajuste, elevando a agilidade de codificação e confiabilidade (evitando typos)

### 2. Usuário
#### **Cadastro e Atualização:**
  - Método **HTTP** POST/PUT na rota '/user' para criação. É passado no corpo da requisição um **JSON** com as informações para o cadastro ou atualização do usuário.
#### **Validação do Input:**
  - **Yup** utilizado para criação de *schemas* que permitem validação ou transformação de valores para garantir que o usuário não insira entradas fora do previsto. Sua utilização agiliza o processo de desenvolvimento bem como aprimora a robustez dos filtros de input.

### 3. Segurança
#### **Senha**:
  - biblioteca **bcrypt** transforma a senha inserida pelo usuário em uma hash criptografada. Para que a senha não esteja facilmente disponível no banco de dados, um método do bycript é invocado antes do armazenamento dos dados no DB através de um **hook** do Sequelize. A senha original não se mantém armazenada devido à declaração como variável **VIRTUAL** do Sequelize, fazendo-a existir apenas em código.
#### **Autenticação**:
  - Um usuário logado é identificado através de um *token*, gerado pela biblioteca **JWT - JSON Web Token**. O *token* não permite modificações, sendo robusto à interceptações maliciosas. Algumas funcionalidades são limitadas à usuários logados, como exemplo, cadastro de remetentes.

