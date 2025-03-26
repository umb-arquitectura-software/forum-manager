
# Forum Manager
Desplegar el proyecto en local
- node 18
- npm i
- solicitar variables de entorno .env
- npm run start:dev


Desplegar el proyecto en docker
- docker-compose up -d


Subir proyecto a dockerhub
- docker build -t harold1013/forum-manager:latest .
- docker push harold1013/forum-manager:latest 

Subir proyecto a GCP
- docker buildx build -t forum-manager --platform linux/amd64 .
- docker tag forum-manager gcr.io/haroldscc-test/forum-manager
- docker push gcr.io/haroldscc-test/forum-manager