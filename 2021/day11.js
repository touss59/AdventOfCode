function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  }        
      
let grid = fileread("day11.txt")
.toString()
.replace(/(\r)/gm, "")
.split("\n")
.map((row) => row.split('').map((number) => parseInt(number)));


let flashes = 0;

for(var i=0 ; i < 100; i++){
    executeStep();
}

console.log(flashes);

let count = 100;
while(!allOctopusFlash(grid)){
    executeStep(grid);
    count++;
}

console.log(count);

function executeStep(){
    const adjacentCoords = [[-1,0],[-1,-1],[-1,+1],[0,-1],[0,+1],[1,-1],[1,0],[1,1]]
    let OctopusesAlreadyUsed = JSON.parse(JSON.stringify(grid));
    let newFlashes = addOneToEachOctopuse();
    flashes+=newFlashes;
    while(newFlashes > 0){
        let result = getNewGridAndNewFlashes();
        grid = result[0];
        newFlashes = result[1].length;
        flashes += newFlashes;
    }

    for(var y=0 ; y < grid.length ; y++){
        for(var x=0 ; x < grid[y].length ; x++){
            if(grid[y][x] > 9){
                grid[y][x] = 0;
            }
        }
    }

    function addOneToEachOctopuse(){
        let count = 0;
        for(var y=0 ; y < grid.length ; y++){
            for(var x=0 ; x < grid[y].length ; x++){
                grid[y][x] ++;
                if(grid[y][x] > 9){
                    count++;
                }
            }
        }
        return count;
    }
    
    function getNewGridAndNewFlashes(){
        let newGrid = JSON.parse(JSON.stringify(grid));
        let newFlashes = [];
        for(var y=0 ; y < grid.length ; y++){
            for(var x=0 ; x < grid[y].length ; x++){
                let addPower = 0;

                for(var z=0 ; z < adjacentCoords.length; z++){

                    if(grid[y+adjacentCoords[z][0]] != undefined
                         && grid[y+adjacentCoords[z][0]][x+adjacentCoords[z][1]] != undefined
                          && grid[y+adjacentCoords[z][0]][x+adjacentCoords[z][1]] > 9
                          && OctopusesAlreadyUsed[y+adjacentCoords[z][0]][x+adjacentCoords[z][1]] != true){
                        addPower++;
                    }
                }
                newGrid[y][x] = grid[y][x] + addPower;
                if(newGrid[y][x] > 9 && grid[y][x] <= 9){
                    newFlashes.push([y,x]);
                }
            }
        }

        for(var y=0 ; y < grid.length ; y++){
            for(var x=0 ; x < grid[y].length ; x++){
                if(grid[y][x] > 9){
                    OctopusesAlreadyUsed[y][x] = true;
                }
            }
        }

        return [newGrid, newFlashes];
    }

}

function allOctopusFlash(grid){
    let result = true;

    for(var y=0 ; y < grid.length ; y++){
        for(var x=0 ; x < grid[y].length ; x++){
            if(grid[y][x] != 0){
                result = false;
            }
        }
    }
    return result;
}

