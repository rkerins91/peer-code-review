# EXPRESS-STARTER



## Installing MongoDB Locally
1. Install homebrew if you don't already have it
2. `brew tap mongodb/brew`
3. `brew install mongodb-community`

## Running MongoDB Locally
1. In two separate terminals run `mongod`, and then `mongo`
2. To see what dbs are on your machine, use `show dbs` command
3. To make our db, use `use pumpkin_spice` command

As a note, you will not be able to see the pumpkin_spice db using the `show dbs` command until it has a document added to it. You can add a basic one with your name and email by running the server and making an post request to `localhost:3001/user/register` and sending 'name' and 'email' as the the body.