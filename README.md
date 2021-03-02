## MobiCard

MobiCard is an Online Payment & Purchasing Application with a Virtual Card.

## Tech Stack
1. Vuejs - Client Side
2. Expressjs/Nodejs - REST API
3. MongoDb - Data Storage
4. Flutterwave

## Todo
### Serverside
1. Create Serverside - Done
2. Connect MongoDb - Done
3. Auth routes - Done
4 Create Virtual Card Route - Pending
5. Transcations Route - Pending
### Client Side - Pending


## Set up
- install node packages `npm install`
- cd into server file and run `npm run dev` to start server for development purporses

## Recomended
- Create a .env file and have the port value be above 3000
- example in dev.env file

### If you dont have a mongo cloud account
- You can install Docker from [here](https://docs.docker.com/docker-for-windows/install/)
- Run `docker-compose -f stack.yml up` in the root [for more info](https://hub.docker.com/_/mongo)
- Access monogo express [here](http://localhost:8081/) and mange the db
