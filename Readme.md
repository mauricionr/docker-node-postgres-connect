Docker-Sequelizer Example
-------------------------

This is an example application that sets uses the official postgre and node docker images to deploy a node app with a database.

It uses express to route, and sequelize for ORM.

The example app is a simple message redording app, letting users save, modify and delete messages (each with a title and body).

To run:
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
	
That code pulls the latest postgres and node images, sets up a database container, installs the node app and then runs it (using the current volume, so no image needs to be created).

Once everything is running, you should see: 
```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                     NAMES
52b9b8f42564        node:latest         "npm run dev"            9 minutes ago       Up 9 minutes        0.0.0.0:8080->44441/tcp   node-dse
6a912b4f43a9        postgres            "/docker-entrypoint.s"   9 minutes ago       Up 9 minutes        5432/tcp                  pg-dse
```
(your container ID's will differ)


Your app will likely be running at http://192.168.99.100:8080/, if not, use kitematic or `docker-machine ip [machine-name]` to find your machine's ip


To stop the app:
```
$ docker stop node-dse
$ docker stop pg-dse
```
