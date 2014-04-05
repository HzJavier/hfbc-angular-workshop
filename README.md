# HACK FOR BIG CHOICES MX Workshop

This is the finished code of the app for the HACK FOR BIG CHOICES MX workshop @ITESM.

This is a node server that provides an API to read JSON files with sample data to use in the Angular demo app.

## Installing

This project requires NodeJs and npm. Installers for node.js can be found [here](http://nodejs.org/download/).
Once node and npm is installed, run:

```shell
npm install
```

This will install:
- Express
- Bower
- Grunt
- LESS

### A note for all the participants

The code for the components is now included in the repo, so there is no need to download any other files or to use bower. 
Just clone or download all the files of this repo, run the server with node and you are done.

## Running the server

The server runs on localhost port 5000, on the console type:

```shell
node index.js
```

Now you can go to your browser and navigate to http://localhost:5000/

## Installing packages with Bower

To install the web packages, run the following script

```shell
bower install
```
