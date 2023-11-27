# moodle-theme_ktt_boost_child_som

https://eswatini.moodle.solidlines.io/

## Moodle docs

https://docs.moodle.org/dev/Creating_a_theme_based_on_boost


## Github theme boost
https://github.com/moodle/moodle/blob/master/theme/boost/scss/preset/default.scss

## Docker
### install

docker pull bitnami/moodle:4.1.1

Invoke-WebRequest -Uri "https://raw.githubusercontent.com/bitnami/containers/main/bitnami/moodle/docker-compose.yml" -OutFile "docker-compose.yml"


docker-compose up -d

docker network create moodle-network

* docker network rm moodle-network

docker volume create --name mariadb_data

docker run -d --name mariadb `
  --env ALLOW_EMPTY_PASSWORD=yes `
  --env MARIADB_USER=bn_moodle `
  --env MARIADB_PASSWORD=bitnami `
  --env MARIADB_DATABASE=bitnami_moodle `
  --network moodle-network `
  --volume mariadb_data:/bitnami/mariadb `
  bitnami/mariadb:latest

docker volume create --name moodle_data

docker run -d --name moodle `
  -p 8080:8080 -p 8443:8443 `
  --env ALLOW_EMPTY_PASSWORD=yes `
  --env MOODLE_DATABASE_USER=bn_moodle `
  --env MOODLE_DATABASE_PASSWORD=bitnami `
  --env MOODLE_DATABASE_NAME=bitnami_moodle `
  --network moodle-network `
  --volume moodle_data:/bitnami/moodle `
  bitnami/moodle:4.1.1

### cmd

https://hub.docker.com/r/bitnami/moodle

docker ps
docker exec -it  moodle411-moodle-1 bash
cd /bitnami/moodle
ls

docker ps
docker cp C:\GitHubRepositories\kimbalear\ktt_boost_child_som moodle411-moodle-1:/bitnami/moodle/theme/ktt_boost_child_som

docker exec -it  moodle411-moodle-1 bash
ls -l /bitnami/moodle/theme/ktt_boost_child_som

### del directory

docker exec moodle411-moodle-1 rm -r /bitnami/moodle/theme/ktt_boost_child_som

## Testing
http://localhost/theme/ktt_boost_child_som/test.php