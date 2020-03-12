# Peer Code Review

## To Run Locally

### Install dependencies
1. `git clone https://github.com/rkerins91/peer-code-review.git`
2. Navigate to root directory on shell
3. Navigate to client directory and run `npm install`
4. Navigate to server directory and run `npm intall`

### Installing MongoDB Locally

1. Install homebrew if you don't already have it
2. `brew tap mongodb/brew`
3. `brew install mongodb-community`

### Running MongoDB Locally

1. In two separate terminals run `mongod`, and then `mongo`
2. To see what dbs are on your machine, use `show dbs` command
3. To make our db, use `use pumpkin_spice` command

### Install and Run redis locally

1. `brew install redis` or `install redis-server` using another package manager
2. Start the service with `redis-server start`, runs on port 6379
3. Test if your service is running with `redis-cli ping` it should reply "PONG"

### Run app
1. From server directory, run `npm run dev`
2. From client directory, run `npm start`

