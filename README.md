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


## Elastic Beanstalk

Create an environment using the Elastic Beanstalk client:

    cd backend
    eb init --profile home
    eb create master --cname wordpress-cms --database --single

Go to the admin panel:

    eb console
    Configuration > Software Configuration

Set the environment variables:

    WORDPRESS_DB_HOST: 'XX.us-east-1.rds.amazonaws.com:3306'
    WORDPRESS_DB_USER: 'XX'
    WORDPRESS_DB_PASSWORD: 'XX'
    WORDPRESS_DB_NAME: 'wordpress'

Deploy a version using the Elastic Beanstalk client:

    eb deploy

Create an environment using the AWS client:

    cd backend
    aws configure --profile home
    aws elasticbeanstalk create-environment --application-name wordpress-cms --cname-prefix wordpress-cms --environment-name master --solution-stack-name "64bit Amazon Linux 2017.09 v2.8.0 running Docker 17.06.2-ce"

Deploy a version using the AWS client:

    zip -r v2.zip .
    aws s3 cp v1.zip s3://wordpress-cms.us-east-1.elasticbeanstalk.com/versions/
    aws elasticbeanstalk create-application-version --application-name wordpress-cms --version-label v1 --description v1 --source-bundle S3Bucket="wordpress-cms.us-east-1.elasticbeanstalk.com",S3Key="versions/v1.zip" --auto-create-application
    aws elasticbeanstalk update-environment --application-name wordpress-cms --environment-name master --version-label v1

## Deployment

Ensure you have just backend and mysql running:

    docker-compose stop
    docker-compose up backend mysql

In a second terminal window, generate a static build:

    cd frontend
    npm install
    npm run build:prerender

Or to build with custom base url:

    ng build --prod --base-href http://angular-universal-example.s3-website-us-east-1.amazonaws.com
    ng build --prod --app 1 --output-hashing=false --base-href http://angular-universal-example.s3-website-us-east-1.amazonaws.com
    npm run webpack:server && npm run generate:prerender

To view the statically generated version locally use:

    npm run serve:prerender


## Exporting the database

Export database to local:

    docker-compose exec mysql /usr/bin/mysqldump -u root --password=example --databases wordpress > backend/backup.sql


## Directory structure

    frontend/                               --> Frontend sources files
    frontend/static.paths.ts                --> Static generation for Wordpress API
    frontend/app/app-routing.server.ts      --> Angular routing for Wordpress API


## Contact

For more information please contact kmturley