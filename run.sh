docker pull postgres
docker pull node

docker run --name pg-dse -e POSTGRES_PASSWORD=passwrd -e POSTGRES_USER=pg -e POSTGRES_DB=dse -d postgres
docker run -it --rm --name docker-sequalize-example -v "$PWD":/usr/src/app -w /usr/src/app node:latest npm install --no-bin-links
docker run -it --rm --name docker-sequalize-example --link pg-dse:postgres -p 8080:44441 -v "$PWD":/usr/src/app -w /usr/src/app node:latest npm run dev