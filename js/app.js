//
// Objects for two rovers
//
let curiosity = {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [ [0, 0] ],
    name: "Curiosity"
}
let beagle = {
    direction: "N",
    x: 9,
    y: 9,
    travelLog: [ [0, 0] ],
    name: "Beagle"
}
  
//
// Obstacles array
//
const obstacles = [
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
    [, , , , , , , , , ],
]

//
// Function for generate obstacles
//
function generateObstacles() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            obstacles[i][j] = Math.round(Math.random());
        }
    }
    // The initial position of the rovers can't have an obstacle
    obstacles[curiosity.x][curiosity.y] = 0;
    obstacles[beagle.x][beagle.y] = 0;
}
generateObstacles();

//
// Intructions
//
console.log(`%cThere is two rovers and obstacles, the name of the rovers are %ccuriosity %cand %cbeagle`,
 `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`, `color: green`);
console.log(`%cYou can move the rover with the function %cmoveRover("_commands_", _nameOfTheRover__)`,
 `color: black; font-weight: bold`, `color: green`);
console.log(`%cThe commands are %cr %cand %cl %cto turn right or left, and %cf %cand %cb %cfor movement forward or backward`,
 `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`, `color: green`, 
 `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`);
console.log(`%cExample: %cmoveRover("rfffrfflf", curiosity)`,
`color: black; font-weight: bold`, `color: green`);
console.log(`%cThe obstacles are:`, `color: black; font-weight: bold`);
console.table(obstacles);

//
// Function to check obstacles
//
function checkObstacle(rover, prevPos) {
    // Check if the rover is out of the grid. If the rover is out of the grid the movement will be undone.
    if (rover.x < 0|| rover.x > 9 || rover.y < 0 || rover.y > 9) {
        rover.x = prevPos[0];
        rover.y = prevPos[1];
        console.log(`%cYou can't move out of the grid!. The position have not changed.`, `color: red; font-weight: bold`);
    
    // Check if there is an obstacle in the position of the rover. If there is an obstacle the movement will be undone.
    } else if (obstacles[rover.x][rover.y] === 1){
        rover.x = prevPos[0];
        rover.y = prevPos[1];
        console.log(`%cThere is an obstacle!. The position have not changed.`, `color: red; font-weight: bold`);
    // Check if there is another rover. If there is another rover the movement will be undone.
    } else if (curiosity.x === beagle.x && curiosity.y === beagle.y) {
        rover.x = prevPos[0];
        rover.y = prevPos[1];
        console.log(`%cThere is another rover!. The position have not changed.`, `color: red; font-weight: bold`);
    // If all is Ok push new position to travelLog and log
    } else {
        // Push to traveLog
        let newPosition = [rover.x, rover.y];
        rover.travelLog.push(newPosition);
        // Log new position
        showChanges(rover, "move");
    }
}

//
// Function to show the changes in Rover
//
function showChanges(rover, change) {
    if (change === "direction") {
        // Log new direction of the rover
        console.log(`%c${rover.name} new direction: %c${rover.direction}`, `color: black; font-weight: bold`, `color: green`);
        console.log("------");
    } else if (change === "move") {
        // Log new position and direction of the rover
        console.log(`%cRover: %c${rover.name}%c, Current Position: %c[${rover.x}, ${rover.y}]%c, Direction: %c${rover.direction}`
        , `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`, `color: green`);
        console.log("------");
    }
}

//
// Functions for turns
//
// Turn left
function turnLeft(rover) {
    switch (rover.direction) {
        case "N":
            rover.direction = "W";
            break;
        case "E":
            rover.direction = "N";
            break;
        case "S":
            rover.direction = "E";
            break;
        case "W":
            rover.direction = "S";
            break;
    }
    showChanges(rover, "direction");
}
//
// Turn right
function turnRight(rover) {
    switch (rover.direction) {
        case "N":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "N";
            break;
    }
    showChanges(rover, "direction");
}

//
// Functions for movements
//
// Move Forward
function moveForward(rover) {
    let prevPos = [rover.x, rover.y];
    switch (rover.direction) {
        case "N":
            rover.x--;
            break;
        case "E":
            rover.y++;
            break;
        case "S":
            rover.x++;
            break;
        case "W":
            rover.y--;
            break;
    }
    checkObstacle(rover, prevPos);
}
//
// Move Backward
function moveBackward(rover) {
    let prevPos = [rover.x, rover.y];
    switch (rover.direction) {
        case "N":
            rover.x++;
            break;
        case "E":
            rover.y--;
            break;
        case "S":
            rover.x--;
            break;
        case "W":
            rover.y++;
            break;
    }
    checkObstacle(rover,prevPos);
}

//
// Function for show travelLog in string format (More readable)
//
function showTravelLog(rover) {
    let travelLogStr = "";
    for (let i = 0; i < rover.travelLog.length; i++) {
        travelLogStr += `[ ${rover.travelLog[i][0]}, ${rover.travelLog[i][1]} ]` ;
    }
    console.log("--------------------------------------------------------")
    console.log(`%cTavel Log: %c${travelLogStr}`, `color: black; font-weight: bold`, `color: green`);
}

//
// Function for move Rover
//
function moveRover(command, rover) {
    // Log Initial position of the rover
    console.log(`%cRover: %c${rover.name}%c, Initial Position: %c[${rover.x}, ${rover.y}]%c, Direction: %c${rover.direction}`
    , `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`, `color: green`, `color: black; font-weight: bold`, `color: green`);
    console.log("------")

    // Separate command in characters and execute functions
    for (let i = 0; i < command.length; i++) {
        // Variable for store command char
        let order = command[i];
        // Validate command *Only f, b, l, r*
        if (order != "f" && order != "b" && order != "l" && order != "r") {
            console.log("%cIt isn't  a valid Command. Only f, b, r, l.", "color: red; font-weight: bold");
            continue;
        } else {
            // Depend of the command executes a function
            switch (order) {
                case "f":
                    moveForward(rover);
                    break;
                case "b":
                    moveBackward(rover);
                    break;
                case "l":
                    turnLeft(rover);
                    break;
                case "r":
                    turnRight(rover);
                    break;
            }
        }
    }
    // Execute function to show the travel log
    showTravelLog(rover);
}

// moveRover("rfffffffffffffff", rover)