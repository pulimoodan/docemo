## Installation

```bash
$ yarn
```

## Environment variables

Copy the `.env.example` file and create a `.env` file. Configure your database and other env variables.

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

```

## Admin page

Go to the `/admin` url and login using the credentials `admin@example.com` and `1234`. You can change this credentials in the admin panel at `/admin/settings`.

## Admin settings

Go to `/admin/settings` and setup the email and payment settings. This is required for your app to work properly.

## Website settings

Go to `/admin/settings`, you can change your website domain and currency.

## Deploy the app

```bash
$ yarn; yarn add @nestjs/cli; yarn prisma migrate deploy; yarn build
# production mode
$ yarn start:prod
```
