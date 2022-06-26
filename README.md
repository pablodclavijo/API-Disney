# Disney RESTful API

A RESTful API designed to interact with a Disney database made for the Alkemy Labs Challenge

## Documentation

Made with Swagger

[Click Here to see it](https://app.swaggerhub.com/apis/PABLODCLAVIJO_1/disneyapi/1.0.0/)

## General Description

### Registration and Authorization

Made with Passport JS and JWT.
The user will need to first create a user with their email and a password to get a token, that will have to be sent through the body of every request in order to be authorized

### Endpoints
#### /auth
Handles the aforementioned authorization and registration at /login and /register respectively

#### /movies

Allows you to **create, read, update and delete** movies and shows from the database. Get them in bulk, search by title or filter by genre. Allows you to also request to have the results sorted alphabetically both ascending or descending. You can also get a movie's or show's full information by adding its id appended as an new endpoint at "/movies/**id**"

#### /characters

Allows you to **create, read, update and delete** characters from the database. Get them in bulk ,search by name or filter by either age or the movies and shows they've worked in. Allows you to get the full information from a character by adding its id appended as an new endpoint at "/characters/**id**"


## License
[MIT](https://choosealicense.com/licenses/mit/)