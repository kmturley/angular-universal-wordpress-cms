# angular-universal-wordpress-cms

Example app using the following libraries:
* Angular Universal
* Wordpress CMS


## Installation

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

In a second terminal window, generate a static build using a base href command:

    cd frontend
    ng build --prod --base-href http://angular-universal-example.s3-website-us-east-1.amazonaws.com
    ng build --prod --app 1 --output-hashing=false --base-href http://angular-universal-example.s3-website-us-east-1.amazonaws.com
    npm run webpack:server && npm run generate:prerender


## Directory structure

    frontend/                               --> Frontend sources files
    frontend/static.paths.ts                --> Static generation for Wordpress API
    frontend/app/app-routing.server.ts      --> Angular routing for Wordpress API


## Contact

For more information please contact kmturley