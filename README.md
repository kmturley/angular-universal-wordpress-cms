# angular-universal-wordpress-cms

Example app using the following libraries:
* Angular Universal
* Wordpress CMS


## Installation

If you need to use an existing database, place it at:

    backend/backup.sql

Start by running the docker container locally:

    docker-compose up

Then go to the admin to continue installation at:

    http://localhost:8080/

Enable permalinks by going to:

    http://localhost:8080/wp-admin/options-permalink.php

Setting Custom Structure to be:

    /%category%/%postname%/

Setting Category Base to be:

    .


## Usage

View the Angular frontend at:

    http://localhost:4200/

And use the Wordpress API at:

    http://localhost:8080/wp-json/wp/v2/posts


## Deployment

Ensure you have just backend and mysql running:

    docker-compose stop
    docker-compose up backend mysql

In a second terminal window, generate a static build:

    npm run build:prerender

Or build with custom base url:

    cd frontend
    ng build --prod --base-href http://angular-universal-example.s3-website-us-east-1.amazonaws.com
    ng build --prod --app 1 --output-hashing=false --base-href http://angular-universal-example.s3-website-us-east-1.amazonaws.com
    npm run webpack:server && npm run generate:prerender

To view the statically generated version locally use:

    npm run serve:prerender


## Exporting the database

Export database to a file, then copy file from container to local:

    docker-compose exec mysql /usr/bin/mysqldump -u root --password=example --databases wordpress > backend/backup.sql
    docker cp . "$(docker-compose ps -q mysql)":backup.sql


## Directory structure

    frontend/                               --> Frontend sources files
    frontend/static.paths.ts                --> Static generation for Wordpress API
    frontend/app/app-routing.server.ts      --> Angular routing for Wordpress API


## Contact

For more information please contact kmturley