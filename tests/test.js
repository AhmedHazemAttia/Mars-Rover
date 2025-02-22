const Rover = require("../service/Rover");
/**
 * Explanation:
 * Forward and Backwards Affects x and y parametes whic is the x and y axis
 * Left and Right Affects the orientation => 
 *      compas POV:
 * Right => clockwise
 * Left => antiClockWise
 */
describe("Mars Rover", () => {
    test("should initialize with correct position and orientation", () => {
        const rover = new Rover(4, 2, "east");
        expect(rover.getPosition()).toEqual({
            x: 4,
            y: 2,
            orientation: "east",
        });
    });

    test("should move forward in the current direction", () => {
        const rover = new Rover(0, 0, "north");
        rover.processCommands("F");
        expect(rover.getPosition()).toEqual({ x: 0, y: 1, orientation: "north" });
    });

    test("should move backward in the current direction", () => {
        const rover = new Rover(0, 0, "north");
        rover.processCommands("B");
        expect(rover.getPosition()).toEqual({ x: 0, y: -1, orientation: "north" });
    });

    test("should rotate right correctly", () => {
        const rover = new Rover(0, 0, "north");
        rover.processCommands("R");
        expect(rover.getPosition()).toEqual({ x: 0, y: 0, orientation: "east" });
    });

    test("should rotate left correctly", () => {
        const rover = new Rover(0, 0, "north");
        rover.processCommands("L");
        expect(rover.getPosition()).toEqual({ x: 0, y: 0, orientation: "west" });
    });

    test("should execute a sequence of commands correctly", () => {
        const rover = new Rover(4, 2, "east");
        rover.processCommands("FLFFFRFLB");
        expect(rover.getPosition()).toEqual({ x: 6, y: 4, orientation: "north" });
    });

    test("should handle negative coordinates", () => {
        const rover = new Rover(0, 0, "west");
        rover.processCommands("FF");
        expect(rover.getPosition()).toEqual({ x: -2, y: 0, orientation: "west" });
    });

    test("should report if the next move will be an obstacle", () => {
        const obstacle = [[6,5], [3,5], [7,4]];
        const rover = new Rover(4,2,"east", obstacle);
        
        const result = rover.processCommands("FLFFFRFLB");
    
        expect(result).toEqual({
            "status": "stopped",
            "message": "Rover encountered an obstacle and stopped.",
            "position": {
                "x": 5,
                "y": 5,
                "orientation": "east"
            }
        });
    });
});
