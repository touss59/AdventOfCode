function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day15.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map(line => line.split('').map(number => parseInt(number)));

setFullMap(input); // for part2, use heapmap to improve performance

const exit = (input.length - 1).toString() + ',' + (input[1].length - 1).toString();

let cellToTake = {};
cellToTake["0,0"] = input[0][0];

let cellOptimalScore = {};

solve();
console.log(cellOptimalScore[exit] - input[0][0]);


function solve(){
    let isFound = false;
    while(!isFound){
        let nearestCell =  getNearestCell();
        getNeighbours(nearestCell);
        if(nearestCell[1] === exit){
            isFound = true;
        }
    }
}

function getNearestCell(){
    let min = [Number.MAX_VALUE, ""];

    for(var key in cellToTake){
        cellVal = cellToTake[key];
        if(cellVal < min[0]){
            min = [cellVal, key];
        }
    }

    delete cellToTake[min[1]];
    cellOptimalScore[min[1]] = min[0];

    return min;
}

function getNeighbours(cell){
    let coord = cell[1].split(',').map(c => parseInt(c));
    let y = coord[0];
    let x = coord[1];

    let neighborsCords = [[y-1,x],[y,x-1],[y,x+1],[y+1,x]];

    for(let c of neighborsCords){
        let neighborVal = input[c[0]] !== undefined ? input[c[0]][c[1]] : undefined;
        let cString = c[0].toString()+','+ c[1].toString();

        if(neighborVal !== undefined && cellOptimalScore[cString] == undefined){

            let newVal = neighborVal + cell[0];

            if(cellToTake[cString] !== undefined){
                cellToTake[cString] = cellToTake[cString] < newVal ? cellToTake[cString] : newVal;
            }else{
                cellToTake[cString] = newVal;
            }
        }
    }
}


function setFullMap(map){
    let yLenght = map.length;
    let xlenght = map[0].length;

    for(let y = 0; y < yLenght * 5; y++){
        for(let x = 0; x < xlenght * 5; x++){
            if(map[y] == undefined){
                let val = map[y - yLenght][x] + 1 < 10 ? map[y - yLenght][x] + 1  : 1;
                map[y] = [];
                map[y].push(val);
            }else if(map[y][x] == undefined){
                let val;
                if(map[y][x - xlenght] == undefined){
                    val = map[y - yLenght][x] + 1 < 10 ? map[y - yLenght][x] + 1  : 1;
                }else{
                    val = map[y][x - xlenght] + 1 < 10 ? map[y][x - xlenght] + 1  : 1;
                }
                map[y].push(val);
            }
        }
    }

}