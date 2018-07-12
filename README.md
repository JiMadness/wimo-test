# wimo-test
API that tracks shipping proccess for Wimo.


# Running the server
1. Create the DB in MySQL.
2. Add the DB configuration in the .env file.
3. Navigate to the project directory.
4. Install required modules.
> npm install
5. Run the server.
> npm start


# Importing API data
1. Open app.js
2. Add the following to the script
> require('./scripts/import').import(()=>console.log('Data imported successfully.'));
3. Run the server.
> npm start


