For a live version, please navigate to this link: https://calendar.rawdev.io

Run NPM install to install all the NPM packages used in the application  
Run NPM run dev to run the application on localhost.

Backend:

- This application relies on prisma
- Steps to connect your own database to this application (for this application, we relied on a Heroku database):
  - Add in a .env file the following database url:
    - if using an online database:
      `DATABASE_URL="postgres://[USER]:[PASSWORD]@[CLUSTER]:[PORT]/[NAME OF DATABASE]?schema=public"`
    - if using local database:
      `DATABASE_URL="postgres://[USER]:[PASSWORD]@localhost:[PORT]/[NAME OF DATABASE]?schema=public"`
  - Once you have that, run the following in the terminal
  ```bash
  npx prisma migrate dev --name init
  npx prisma migrate deploy
  ```

For any questions, do not hesitate to contact the creator of this app: info@rawdev.io
