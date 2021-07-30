## Resumo:
O objetivo desta aplicação é facilitar as compras e vendas. 
O usuário pode criar anúncios em determinadas categorias, atualizar e deletar.
E também visualizar todos os anúncios disponiveis.

## Tecnologias utilizadas:
    - Nextjs
    - Nodejs
    - Typescript
    


### Clonando o projeto:
    - Clone este reposítório via terminal usando git clone https://github.com/laura-caroline/bas.git
    - Utilize o comando via terminal cd bas.
  
  
## Iniciando o Nextjs:
    - Acesse a pasta web
    - Utilize via terminal o comando npm install para instalar as dependências.
    - Utilize via terminal o comando npm run dev para rodar a aplicação

### Iniciando o Nodejs:
    1. Acesse a pasta server
    2. Utilize via terminal o comando npm install para instalar as dependências.
    3. Acesse o mysql e crie a database que irá armazenar as tabelas.
    4. Crie um arquivo .env na raiz e coloque as seguintes variaveis ambiente e preencha:
        
        USER_DATABASE="usuario para acessar seu banco de dados"
        PASSWORD_DATABASE="senha para acessarseu banco de dados
        DB_DATABASE="o nome da database que você criou anteriormente"
        HOST_DATABASE="localhost"
        DIALECT_DATABASE="mysql"
        APP_PORT=8080
       
    5. Utilize o comando via terminal npx sequelize-cli db:migrate para criar as tabelas
    6. Utiliz o comando via terminal npx sequelize-cli db:seed:all para criar os dados padrão
    6. Utilize o comando via terminal nodemon src/app.js para rodar a aplicação
    

## Atividades: 
**Usuário padrão**
- [x] Criar conta
- [x] Fazer login
- [x] Visualizar anuncios
- [x] Visualizar detalhes dos anuncios

**Usuário Autenticado**:

  - [x] Adicionar anúncio
  - [x] Remover anúncio
  - [x] Editar o anúncio
  - [x] Visualizar anúncios adicionados por mim
    

# Contato:

  Gmail: carolinelaura69@gmail.com 
  
  Linkedin: https://www.linkedin.com/in/laura-caroline
