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
  ```node
  ___response___
  {
   status: 'success',
   data : {
    message: 'User account successfully created',
    token: String,
    userId: Integer
   }
  }
  ```
  | Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

| Request        |
| ------------- |
| ```node {
status: 'success'
}```       |


  * Admin/Employees can sign in.# RESTAPIDocs Examples

These examples were taken from projects mainly using [Django Rest
Framework](https://github.com/tomchristie/django-rest-framework) and so the
JSON responses are often similar to the way in which DRF makes responses.

Where full URLs are provided in responses they will be rendered as if service
is running on                                               http://testserver/

## Open Endpoints

Open endpoints require no Authentication.

* [Login](login.md) : `POST /api/login/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](user/get.md) : `GET /api/user/`
* [Update info](user/put.md) : `PUT /api/user/`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* [Show Accessible Accounts](accounts/get.md) : `GET /api/accounts/`
* [Create Account](accounts/post.md) : `POST /api/accounts/`
* [Show An Account](accounts/pk/get.md) : `GET /api/accounts/:pk/`
* [Update An Account](accounts/pk/put.md) : `PUT /api/accounts/:pk/`
* [Delete An Account](accounts/pk/delete.md) : `DELETE /api/accounts/:pk/`
