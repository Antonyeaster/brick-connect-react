# Deployment

## Table of Contents

### Setting up a basic Django project and deploying to Heroku

-   [**Deployment**](#deployment)
    -   [**Initial Deployment**](#initial-deployment)
    -   [**Create Repository**](#create-repository)
    -   [**Setting up the Workspace**](#setting-up-the-workspace)
    -   [**Deploying the app to Heroku**](#deploying-the-app-to-heroku)
        -   [**Create Heroku App**](#create-heroku-app)
        -   [**Connect to the API**](#connect-to-the-api)
        -   [**Final Deployment**](#final-deployment)
        -   [**Forking the GitHub Repository**](#forking-the-github-repository)
        -   [**Making a Local Clone**](#making-a-local-clone)

## Initial Deployment

Early deployment is key, so this was one of the very first steps i tackled. By deploying to heroku early I knew future complications were less likely.


### Create repository:

*  Create a new repository in GitHub, I used the [Code Institute](https://github.com/new?template_name=react-ci-template&template_owner=Code-Institute-Org) template to get set up.

### Setting up the Workspace

* Create a new workspace by clicking the Gitpod button

* When the workspace loads, run the 'npm install' command in the terminal

* Wait for all the packages to be installed and then run 'npm start'. In my case I had to run 'nvm install 16' then 'npm start'

* Check the App is running. The browser should display the react logo spinning

### Deploying the App to heroku

Make sure you are sign up and in to Heroku and follow the instructions below:

1. Create a new Heroku app:
    * Click 'New' in the top right-hand corner of the landing page, then click 'Create new app.'
2. Give the app a unique name:
    * It will form part of the URL - I called mine **brick-connect-react**
3. Select the nearest location:
    * My closest location is Europe
    * The click 'create app'
4. Connect to GitHub:
    * From the deploy tab, click on 'GitHub' in the 'Deployment Method' section.
    * Enter the name of the repository and click 'connect'.
    * Click 'deploy branch'.

### Connect to the API

1. In **brick-connect-api**:
    * In the settings tab, add new config vars:
    - Key: CLIENT_ORIGIN, Value: https://brick-connect-react-c56aa699ed51.herokuapp.com
    - Key: CLIENT_ORIGIN_DEV, Value: https://3000-antonyeaste-brickconnec-dhykzdkg5ju.ws-eu110.gitpod.io
    * Remember to remove trailing slash at the end of each link.
    * Install the Axios package and create axiosDefaults.js in api folder.
    - In 'axiosDefaults.js', set baseURL, content-type header, withCredentials.
    - Import axiosDefaults in 'App.js'.

### Final Deployment

In *package.json* file, in the “scripts” section, add the following prebuild command: `"heroku-prebuild": "npm install -g serve"`

This will install a package needed to serve the single page application on heroku.

Add a 'Procfile' at the root of the project with the following web command: `web: serve -s build`

### Forking the GitHub Repository

* Go to the GitHub repository
* Click the 'Fork' button in the top right corner
* This will create a copy of the repository in your own GitHub account

### Making a Local Clone

* Go to the GitHub repository 
* Click the 'Code' button above the list of files
* Click the HTTPS button to clone with HTTPS and copy the link
* Open to command line interface on your local computer
* Change the current working directory to the one where you want the cloned directory
* Type git clone and paste in the URL
* Press enter to create your local clone

**[Back to Readme](README.md)**