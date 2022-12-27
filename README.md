## On this Repo...
- Products GraphQL API using Apollo Server(this branch) or ExpressJS(`class4` branch) with NodeJS and MongoDB.

## To run this app:
### Download npm dependencies
At the project root folder run: `npm install`.
### Install MongoDB 
If you do not have MongoDB Server installed you can download it from [this link](https://www.mongodb.com/try/download/community) and follow the instructions for your OS.

### Run
To start Node app run: `node index.js` or `npm start`.  
To test queries, you can use Postman or any other software that allows HTTP requests.  
You can also go to http://localhost:4000/graphql and use Apollo Server UI.

### Notes
I added the script `init-mongo` becasue in the Linux distro that I use the `mongodb` service doesn't run automatically.
Due to this, first time that I want to use the DB I have to start the service manually.  
More info about this issue [here](https://github.com/Microsoft/WSL/issues/796#issuecomment-392995415)