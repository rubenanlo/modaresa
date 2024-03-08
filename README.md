Run npm install to install all the npm packages used in the application
Run npm run dev to run the application in local host.

Backend:

- It relies on prisma
- Steps to run this application:
  - Add in a .env file the following:
    `DATABASE_URL="[USER]://[USER]:[PASSWORD]@localhost:[PORT]/[NAME OF DATABASE]?schema=public"`
  - Once you have that, run the following in the terminal
  ```bash
  npx prisma migrate dev --name init
  npx prisma migrate deploy
  ```
