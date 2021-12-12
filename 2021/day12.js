function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day12.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map((row) => row.split('-'));

const caveConnections = new Map();

// set caveConnections with input
for (let i = 0; i < input.length; i++) {
    let caveA = input[i][0];
    let caveB = input[i][1];

    updateCaveConnections(caveA, caveB);
    updateCaveConnections(caveB, caveA);
}

console.log(findAllPaths());


function updateCaveConnections(caveA,caveB){
    let cavesConnectedWithA = caveConnections.get(caveA)
    if(cavesConnectedWithA == undefined){
        caveConnections.set(caveA, [caveB]);
    }else{
        cavesConnectedWithA.push(caveB);
    }
}

function findAllPaths(){
    let numberOfPathFound = 0;
    let pathToExplore = [['start']];

    while(pathToExplore.length > 0){
        let actualPath = pathToExplore.pop();
        let endCave = actualPath[actualPath.length - 1];
        let allLowerCaves = actualPath.filter(cave => cave.toString()==cave.toString().toLowerCase());

        let connectedCaves = caveConnections.get(endCave);
    
        connectedCaves.forEach(function(cave){
            if(cave != "end"){
                if(cave != 'start'){
                    if(newConditionPart2(allLowerCaves,cave)){ //condition part1 => !allLowerCaves.includes(cave)
                        let nextPathToExplore = JSON.parse(JSON.stringify(actualPath)); 
                        nextPathToExplore.push(cave);
                        pathToExplore.push(nextPathToExplore);
                    }
                }
            }else{
                numberOfPathFound++;
            }
        });
    }
    return numberOfPathFound;
}

function newConditionPart2(caves,cave){
    let disinctCaves = [...new Set(caves)];

    if(!disinctCaves.includes(cave)){
        return true;
    }

    return disinctCaves.length == caves.length;
}

