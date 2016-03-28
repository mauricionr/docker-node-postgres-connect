Docker Node-to-Postgres Connection
==================================

This is an example application that deploy a node app and a database on separate docker containers using the official postgressql and node images.

It uses express to route, and sequelize for ORM, but you could manage this all yourself, the important part is getting the information about the connection.

The example app is a simple message recording app, letting users display, create, modify and delete messages (each with a title and body).

To run:
-------
```
$ docker pull postgres
$ docker pull node
$ docker run --name pg-dse -e POSTGRES_PASSWORD=passwrd -e POSTGRES_USER=pg -e POSTGRES_DB=dse -d postgres
$ docker run -it --name node-dse --link pg-dse:postgres -p 8080:44441 -v "$PWD":/usr/src/app -w /usr/src/app -d node:latest npm run dev
```
or
```
$ ./run.sh
```
	
That code pulls the latest postgres and node images, sets up a database container, installs the node app and then runs it (using the current volume, so no image needs to be created). Depending on your docker setup, and if you have an app running on port 8080, you might need to change -p flag the last line in the install to a different port.


Once everything is running, you should see: 
```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                     NAMES
52b9b8f42564        node:latest         "npm run dev"            9 minutes ago       Up 9 minutes        0.0.0.0:8080->44441/tcp   node-dse
6a912b4f43a9        postgres            "/docker-entrypoint.s"   9 minutes ago       Up 9 minutes        5432/tcp                  pg-dse
```
(your container ID's will differ).


How the parts communicate
-------------------------

The `--link` argument exposes a number of variables to the node container, these are used to connect to the DB (see ./config.js and ./sequelize.js). The model for the message syncs to the database, writing the table and exporting the model to handle queries and operations. It's quite simple.

Running `docker exec node-dse env | grep POSTGRES` will display a number of environment variables that are used in the communication.

```
$ docker exec node-dse env | grep POSTGRES
POSTGRES_PORT=tcp://172.17.0.2:5432
POSTGRES_PORT_5432_TCP=tcp://172.17.0.2:5432
POSTGRES_PORT_5432_TCP_ADDR=172.17.0.2
POSTGRES_PORT_5432_TCP_PORT=5432
POSTGRES_PORT_5432_TCP_PROTO=tcp
POSTGRES_NAME=/node-dse/postgres
POSTGRES_ENV_POSTGRES_PASSWORD=passwrd
POSTGRES_ENV_POSTGRES_USER=pg
POSTGRES_ENV_POSTGRES_DB=dse
POSTGRES_ENV_GOSU_VERSION=1.7
POSTGRES_ENV_LANG=en_US.utf8
POSTGRES_ENV_PG_MAJOR=9.5
POSTGRES_ENV_PG_VERSION=9.5.1-1.pgdg80+1
POSTGRES_ENV_PGDATA=/var/lib/postgresql/data
```

If you want to get into the postgres container to see the table, use `docker -it exec pg-dse psql -U pg -d dse` and then `\d messages` or `select * from messages;`. Type \q to quit and exit the container.

Your app will likely be running at http://192.168.99.100:8080/, if not, use kitematic or `docker-machine ip [machine-name]` to find your machine's ip. It might also simply be running at http://localhost:8080.

To stop the app:
```
$ docker stop node-dse
$ docker stop pg-dse
```