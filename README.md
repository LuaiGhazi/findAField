# findAField

## Table of contents
* [General info](#general-info)
* [Live Demo](#live-demo)
* [Features](#features)
* [Technologies](#technologies)
* [Getting Started](#getting-started)
* [Future Work](#future-work)

## General info
This project is a CRUD application that allows users to create accounts and submit images, reviews, and information about local soccer fields. The application also includes an interactive map that allows users to get a quick glimpse of the fields that are closest to them. 


## Live demo
Check it out here: https://mysterious-river-36200.herokuapp.com/
	

## Features 
Authentication:
* User can sign up / log in with a username and password

CRUD: 
* Users can create, edit and delete posts and comments
* When submitting a field or editing a previous submission, users can upload multiple photos

Authorization:
* Must be logged in to post a review or submit a new field 
* Only the author of a post or review can edit/delete that specific post or review
* All forms have validation requirements on both the front and back end. 


Map:
* Interactive cluster map that displays the location of each submitted field. 

Miscellaneous: 
* Flash success and error messages 
* Responsive web design


## Technologies
Project is created with:
* JavaScript
* Node.js - version: 10.13.0 
* Bootstrap - version: 5.0
* The following packages: 
    * "@mapbox/mapbox-sdk": "^0.11.0",
    * "cloudinary": "^1.23.0",
    * "connect-flash": "^0.1.1",
    * "connect-mongo": "^3.2.0",
    * "dotenv": "^8.2.0",
    * "ejs": "^3.1.5",
    * "ejs-mate": "^3.0.0",
    * "express": "^4.17.1",
    * "express-mongo-sanitize": "^2.0.2",
    * "express-session": "^1.17.1",
    * "helmet": "^4.4.1",
    * "joi": "^17.3.0",
    * "method-override": "^3.0.0",
    * "mongoose": "^5.11.12",
    * "multer": "^1.4.2",
    * "multer-storage-cloudinary": "^4.0.0",
    * "passport": "^0.4.1",
    * "passport-local": "^1.0.0",
    * "passport-local-mongoose": "^6.1.0",
    * "sanitize-html": "^2.3.2"

* Platforms: 
	* Cloudinary
	* MongoDB Atlas 
	* Heroku

## Getting Started
This app contains API passwords that have been hidden deliberately. Therefore, the app cannot be run on your local machine without creating your own credentials for the relevant APIs. 

To clone or download this repository: 
> git clone https://github.com/luaighazi/find-a-field.git

To install dependencies:
> npm install


## Future Work 
The following features will be added: 
* With the app now live, posts will require approval by an administrator before going live. 
* Ability to filter by location 
* Ability to save favorite submissions 
