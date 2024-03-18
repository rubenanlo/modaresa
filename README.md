![logo](/public/assets/logo.webp)

# Introduction

Welcome to ModaResa new appointment schedule system. In this app you will be able to:

- Create an appointment
- Read a list of appointments
- Update an appointment
- Delete an appointment

Future features:

[] Handle scheduling conflicts: This app will be able to identify an conflicts that either the vendor or the buyer may have. Thus, we expect the AppointmentForm component to read all the buyers' and vendors' appointments, to cross reference the appointment that is being selected in the front end.
[] Filtering the list of appointments by a specific date, or a month.
[] Filtering the list of appointments by vendors or buyers.

# How to set it up

Steps:

1. Create a .env file in the root directory.
2. Add the `DATABASE_URL` variable in that newly created file with on of the following two values:
   - if using an online database:
     `DATABASE_URL="postgres://[USER]:[PASSWORD]@[CLUSTER]:[PORT]/[NAME OF DATABASE]?schema=public"`
   - if using local database:
     `DATABASE_URL="postgres://[USER]:[PASSWORD]@localhost:[PORT]/[NAME OF DATABASE]?schema=public"`
3. Run in the terminal the following commands (you can just copy from here and paste it in the terminal):

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

And that's it! Now you are good to go to use this app.

Any questions? Please feel free to reach out to me.
