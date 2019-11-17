# devTraining


## Table of Content
- [Getting Started](#Getting-Started)
- [Installation and Usage](#Installation-and-Usage)
- [Testing](#Testing)
- [Feature](#Features)
- [Routes for Express](#Routes-for-Express)
- [Models](#Models)
- [API Documentation](#API-Documentation)
- [License](#License)
- [FAQ](#FAQ)

## Getting Started
To run this application, you need have installed the  following:
- Node
- NPM/Yarn (NPM comes with Node)

## Installation
Run the following commands in terminal
##### clone the repo
```
git clone  https://github.com/rozay10/devTraining.git
```
##### Install dependencies
```
npm i 
```

#####  Start the server

```
npm run start
```
___You should use ```localhost:3000``` as your base url___

## Features
  * Admin can create an employee user account.
  ```node
  POST http://localhost:3000/auth/create-user
  ```
  
  ##### Request spec:
  
  ##### Response spec :
  ```node
  status : 201
  {
   status: 'success',
   data : {
    message: 'User account successfully created',
    token: String,
    userId: Integer
   }
  }
  ```
