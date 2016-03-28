Docker-Sequelizer Example
-------------------------

This is an example application that sets uses the official postgre and node docker images to deploy a node app with a database.

It uses express to route, and sequelize for ORM.

The example app is a simple message redording app, letting users save, modify and delete messages (each with a title and body).

To run:
```$ docker pull postgres
$ docker pull node
$ docker run --name pg-dse -e POSTGRES_PASSWORD=passwrd -e POSTGRES_USER=pg -e POSTGRES_DB=dse -d postgres
$ docker run -it --name node-dse --link pg-dse:postgres -p 8080:44441 -v "$PWD":/usr/src/app -w /usr/src/app -d node:latest npm run dev
```
or
```$ ./run.sh```
	
That code pulls the latest postgres and node images, sets up a database container, installs the node app and then runs it (using the current volume, so no image needs to be created).

To stop the app, CTRL-C. then:
```$ docker stop node-dse
$ docker stop pg-dse
```