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
use the above API and add the in the body the designated coordinates (x, y) followed by the direction and reported obstacles 

body Example: 
```sh
{ 
    "x": 4,
    "y": 2,
    "orientation": "east",
    "commands": "FLFFFRFLB",
    "obstacles" : [[6,5], [3,5], [7,4]]
}
```
in case no obstacle invloved in movements:
```sh
 (6,4, North) 
 ```

and if one of the moves will encounter an obstacle: 

```sh
{
    "status": "stopped",
    "message": "Rover encountered an obstacle and stopped.",
    "position": {
        "x": 5,
        "y": 5,
        "orientation": "east"
    }
}
```
