

# School Management API

## Overview
Implementd a set of APIs using Node.js, Express.js framework, and MySQL to manage school data. The system should allow users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## API Endpoints
#### 1. GET /listSchools
Takes the user latitude and longitude as query params and returns a list of near by schools sorted according to euclidean distance.

#### 2. POST /addSchools
Takes the school details like name, address, latitude and longitude via the request body and stores the coresponding school information.

## Error Handling
The API implements comprehensive error handling with specific error types:
- `CoordinateError` - Returned when invalid or out-of-range coordinates are provided
- `BodyError` - Returned when there are issues with body positioning or movement constraints

## Examples

### Get Response
```bash
GET /listSchools
Content-Type: application/json

{
    "result": [
        {
            "name": "School 6",
            "address": "wold",
            "latitude": "37.9239000",
            "longitude": "24.4392000"
        },
        {
            "name": "School 5",
            "address": "some",
            "latitude": "34.9239000",
            "longitude": "24.4392000"
        },
        {
            "name": "Doon School",
            "address": "Dehradun, India",
            "latitude": "30.3352664",
            "longitude": "78.0319707"
        }
    ],
    "user_coordinates": {
        "latitude": 89.9239,
        "longitude": 24.4392
    }
}
```

### Post Request Body
```bash
POST /addSchool
Content-Type: application/json

{
  "name": "Doon School",
  "address": "Dehradun, India",
  "latitude": 130.335266412,
  "longitude": 78.0319706808
}
```

### Post Response Example
```json
{
    "message": "School added successfully",
    "body": {
        "name": "Doon School",
        "address": "Dehradun, India",
        "latitude": 30.335266412,
        "longitude": 78.0319706808
    }
}
```

### Error Response Example
```json
{
    "message": "School already exists at given coordinates"
}
```

## Setup
### 1. Requirements
Ensure Docker and Docker Compose v2 are installed in the system 

### 2. Clone the repo
```bash
git clone https://github.com/atneon27/school-management-api.git
```

### 3. Fire up Docker Compose
```bash
# For building containers
docker compose up --build

# For simply starting up the containers
docker compose up
```

### 4. Handel Shutdowns Gracefully
```bash
# shutdown and kill all containers
docker compose down
```
