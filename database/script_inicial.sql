/* 
no arquivo laravel_api/.env temos a seguinte config
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sample_database
DB_USERNAME=admin
DB_PASSWORD=1234

nela foi definido o acesso ao banco que está sendo criado neste script */

CREATE DATABASE sample_database;

USE sample_database;

CREATE USER 'admin'@'localhost' IDENTIFIED BY '1234';

-- estou habilitando o acesso a todas as funções do DB
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';

/* 
com o DB criado, a estrutura de tabelas foi feita pelo laravel então - dentro da pasta da api - é necessário 
executar via terminal o comando "php artisan migrate" */