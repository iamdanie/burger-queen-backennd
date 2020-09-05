# burger-queen-backend

A NodeJS API using TS, Express, and Sequelize.

## Setup Guide

After cloning, run in root folder

```bash
yarn
```

```bash
cp config/auth.json.dist config/auth.json
```

The build tasks use **Gulp**. Typescript will be transpiled to Javascript in the /build directory.

## Configure your database

This project uses [Sequelize](https://sequelize.org/) with MySQL, therefore, you will need to configure your db parameters included in `src/sqlz/config.json`

```bash
cp src/sqlz/config.json.dist src/sqlz/config.json
```

| Directory           | Description                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| src/sqlz/config     | Database configuration for all environments.                                                                                  |
| src/sqlz/migrations | Your database migrations scripts. Keep this files in Javascript and run sequelize db:migrate to migrate your database schema. |
| src/sqlz/models     | Entities for SQL in Sequelize format.                                                                                         |

When your DB configuration is ready, just run:

```bash
#For development
yarn dev:prepare

#For test
yarn test:prepare

#For production
yarn prod:prepare
```

This will handle DB creation and running all migrations according to the environment.

## Run the application

After running the `prepare` script, you can run the application by doing

```bash
#For development
yarn start:dev

#For test environment
yarn start:dev

#For production
yarn start:prod
```

Your web server will be running on default port 3001 http://localhost:3001

## Build for production

```bash
yarn build
```

# Running unit tests

Simply run

```bash
yarn test
```
