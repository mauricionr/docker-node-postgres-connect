docker pull postgres
docker pull node

docker run --name pg-dse -e POSTGRES_PASSWORD=passwrd -e POSTGRES_USER=pg -e POSTGRES_DB=dse -d postgres
docker run -it --name node-dse --link pg-dse:postgres -p 8080:44441 -v "$PWD":/usr/src/app -w /usr/src/app -d node:latest npm run dev