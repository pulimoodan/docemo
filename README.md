## Installation

```bash
$ yarn
```

## Environment variables

Copy the `.env.example` file and create a `.env` file. Configure your database and other env variables.

## Client secrets

Go to the `.env` file. Configure api keys in that file.

## Website url

Go to the `.env` file and configure the website base url.

## Migration
Configure `prisma/schema.prisma` file according to your database and paste the database url in the .env file as `DATABASE_URL`.
Then run :
```bash
$ yarn prisma migrate dev
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Admin page

Go to the `/admin` url and login using the credentials set in the `.env` file.