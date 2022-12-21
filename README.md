# Clase 5

## Actividades
- Usar GraphQL desde Apollo Server

## To run this app:
### Download npm dependencies
At the project root folder run: `npm install`.

### Run
To start Node app run: `node index.js` or `npm start`.  
To test the queries, you can use Postman or any other software that allows HTTP requests.  
You can also go to http://localhost:4000/graphql and use Apollo Server UI.

### Notes
I added the script `init-mongo` becasue in the Linux distro that I use the `mongodb` service doesn't run automatically.
Due to this, first time that I want to use the DB I have to start the service manually.  
More info about this issue [here](https://github.com/Microsoft/WSL/issues/796#issuecomment-392995415)