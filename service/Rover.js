/**  Rover Movement Logic
 * F B L R => are the only accepted accepted cmds to the rover 
 * Movements are affected by 2 conditions: 
 * Rover Direction (North, South, West, East)
 * Rover Cmd (Forward, Backward, Left, Right)
 * Note:
 * Rover moves on X and Y Axis which has and can contain " + " and " - " values according to the rover direction
 * 
 */
/** Directions

        Y-Axis
            {+}
           North
             |
             |  
             |  
             |  
 {-} West ←------→ East {+}  X-Axis
             |  
             |  
             |  
            South
            {-}


*/



class Rover {
    constructor(x = 0, y = 0, orientation = "north", obstacles = []) {
        this.directions = ["n", "e", "s", "w"];
        this.directionMap = {
            north: "n",
            south: "s",
            west: "w",
            east: "e"
        };
        this.movementMap = {
            n: { F: [0, 1], B: [0, -1] },
            s: { F: [0, -1], B: [0, 1] },
            e: { F: [1, 0], B: [-1, 0] },
            w: { F: [-1, 0], B: [1, 0] }
        };

        this.x = x;
        this.y = y;
        this.orientation = this.directionMap[orientation.toLowerCase()] || "n";
        this.obstacles = obstacles;
        this.stop = false;
    }

    move(cmd) {
        if (cmd in this.movementMap[this.orientation]) {
            const [dx, dy] = this.movementMap[this.orientation][cmd];
            this.updatePosition(dx, dy);
        } else if (cmd === "R" || cmd === "L") {
            this.rotate(cmd);
        } else {
            console.log("Invalid Command");
        }
    }

    updatePosition(dx, dy) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (this.obstacles.some(([ox, oy]) => ox === newX && oy === newY)) {
            this.stop = true;
            return;
        }

        this.x = newX;
        this.y = newY;
    }

    rotate(direction) {
        const indexChange = direction === "R" ? 1 : -1;
        const currentIndex = this.directions.indexOf(this.orientation);
        this.orientation = this.directions[(currentIndex + indexChange + 4) % 4];
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y,
            orientation: Object.keys(this.directionMap).find(
                key => this.directionMap[key] === this.orientation
            )
        };
    }

    processCommands(commands) {
        for (let command of commands) {
            this.move(command);
            if (this.stop) {
                return {
                    status: "stopped",
                    message: "Rover encountered an obstacle and stopped.",
                    position: this.getPosition()
                };
            }
        }
        return this.getPosition();
    }
}

module.exports = Rover;
