# ECommerce-Test

ECommerce-Test is a nodeJS REST API that provides a database of acronyms and definitions along with a custom made frontend.

## Pre-Requisites

- Install MongoDB

## Installation

- Create MongoDB database named `acronyms` if not created
- Create a collection in database named `acronym`
- Add default values to database

```
[{
  "_id": "507f191e810c19729de860eb",
  "acronym": "2B",
  "definition": "To be"
},{
  "_id": "507f191e810c19729de860ec",
  "acronym": "2EZ",
  "definition": "Too easy"
},{
  "_id": "507f191e810c19729de860ed",
  "acronym": "2G2BT",
  "definition": "Too good to be true"
}]
```

- Run nodeJS server

```
npm run serverStart
```

## Usage

`GET /acronym?page=1&limit=10&search=:search`

- Headers
  - Page: Page Number (Default value: 1)
  - Limit: Limit number of records (Default value: 10)
  - search: Acronym that is wanted to be searched (Default value: \*)
    `POST /acronym`
    `PATCH /acronym/:acronymID`
- Requires query string with acronymID
- Body: JSON object with attributes: acronym and definition

```
{
  "acronym": "2EZ",
  "definition": "Too easy"
}
```

`DELETE /acronym/:acronymID`

- Requires query string with acronymID
