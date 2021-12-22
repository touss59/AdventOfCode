function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

const map = fileread("day15.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map(line => line.split('').map(number => parseInt(number)));
    
const biggerMap = Array(5 * map.length)
    .fill(0)
    .map((_, y) =>
        Array(5 * map[0].length)
        .fill(0)
        .map((_, x) => {
            const originalX = x % map.length;
            const originalY = y % map.length;
            const offset = Math.floor(x / map.length) + Math.floor(y / map.length);
            const value = map[originalY][originalX] + offset;
            return value > 9 ? value - 9 : value;
        }));

console.log(solve(map)); // use heapMap to boost performance

function solve(map){
    const exit = (map.length - 1).toString() + ',' + (map[1].length - 1).toString();
    let cellToTake = {"0,0" : map[0][0]};
    let cellOptimalScore = {};
    while(cellOptimalScore[exit] === undefined){
        let nearestCell =  getNearestCell();
        getNeighbours(nearestCell);
    }
    return cellOptimalScore[exit] - map[0][0];

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
        let cellCoord = cell[1].split(',').map(c => parseInt(c));
        let y = cellCoord[0];
        let x = cellCoord[1];
        let neighborsCords = [[y-1,x],[y,x-1],[y,x+1],[y+1,x]];
        for(let c of neighborsCords){
            let neighborVal = map[c[0]] !== undefined ? map[c[0]][c[1]] : undefined;
            let key = c[0].toString()+','+ c[1].toString();
            if(neighborVal !== undefined && cellOptimalScore[key] == undefined){
                let newVal = neighborVal + cell[0];
                cellToTake[key] = cellToTake[key] < newVal ? cellToTake[key] : newVal;
            }
        }
    }
}