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
    constructor(x = 0, y = 0, orientation = "north", obstacle = []) {
        this.directions = {
            n: "north",
            s: "south",
            w: "west",
            e: "east"
        };

        this.x = x;  
        this.y = y; 

       
        this.orientation = Object.keys(this.directions).find(
            key => this.directions[key] === orientation.toLowerCase()
        ) || "n"; 

        this.obstacle = obstacle
        this.stop = false
    }

    move(cmd) {
        let newX = this.x;
        let newY = this.y;

        switch (cmd) {
            case "F":
                if (this.orientation === "n") newY++;
                if (this.orientation === "s") newY--;
                if (this.orientation === "e") newX++;
                if (this.orientation === "w") newX--;
                break;
            case "B":
                if (this.orientation === "n") newY--;
                if (this.orientation === "s") newY++;
                if (this.orientation === "e") newX--;
                if (this.orientation === "w") newX++;
                break;
            case "R":
                this.orientation = this.rotateRight();
                return;
            case "L":
                this.orientation = this.rotateLeft();
                return;
            default:
                console.log("Invalid Cmd");
                return;
        }

        // Check if the new position would have an obstacle
        if (this.obstacle.some(([ox, oy]) => ox === newX && oy === newY)) {
            this.stop = true;
            return;
        }

        // Move only if there's no obstacle and updates the params 
        this.x = newX;
        this.y = newY;
    }

    rotateRight() {
        const direction = ["n", "e", "s", "w"];
        return direction[(direction.indexOf(this.orientation) + 1) % 4];
    }

    rotateLeft() {
        const direction = ["n", "w", "s", "e"];
        return direction[(direction.indexOf(this.orientation) + 1) % 4];
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y,
            orientation: this.directions[this.orientation] 
        };
    }
    processCommands(commands) {
        for (let command of commands) {
            this.move(command);
            if (this.stop) {
                return { 
                    status: "stopped", 
                    message: "Rover encountered an obstacle and stopped.", 
                    position: { x: this.x, y: this.y, orientation: this.directions[this.orientation] }
                };
            }
        }
        return this.getPosition();
    }
}

module.exports = Rover;
