# Mars-Rover

The Rover will be able to get its directions using the /rover endpoint with designated coordinates (x, y) followed by the direction (North, South, East, West).

## Starting the server
Navigate to the `serverAPI` directory and run:  
```sh
node server.js
```

## API Endpoint:
http://localhost:3000/rover

## Postman
use the above API and add the in the body the designated coordinates (x, y) followed by the direction

body Example: 

{
  "x": 4,
  "y": 2,
  "direction": "East"
}

result should be (6,4, North) 