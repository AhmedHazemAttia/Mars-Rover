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

        switch (cmd) {
            case "F":
                if (this.orientation === "n") this.y++;
                if (this.orientation === "s") this.y--;
                if (this.orientation === "e") this.x++;
                if (this.orientation === "w") this.x--;
                if (this.obstacle.some(([ox, oy]) => ox === this.x && oy === this.y)) {
                    this.stop = true;
                }
                break;
            case "B":
                if (this.orientation === "n") this.y--;
                if (this.orientation === "s") this.y++;
                if (this.orientation === "e") this.x--;
                if (this.orientation === "w") this.x++;
                break;
            case "R":
                this.orientation = this.rotateRight();
                break;
            case "L":
                this.orientation = this.rotateLeft();
                break;
            default:
                console.log("Invalid Cmd");
        }
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
    // getXY(){
    //     return {
    //         x: this.x,
    //         y: this.y}

    // }

    processCommands(commands) {
        for (let command of commands) {
            this.move(command);
            if(this.stop) return 'stoped'
        }
        return this.getPosition()
    }
}

const obstacle = [[6,5], [3,5], [7,4]]
const rover = new Rover(4,2,"east", obstacle)
const cmd = "FLFFFRFLB"

console.log(rover.processCommands(cmd))

module.exports = Rover;
