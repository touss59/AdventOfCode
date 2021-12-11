function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day09.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map((row) => row.split('').map(number => parseInt(number)));

function findLowPoints(input){
    let lowPointsVal = [];
    let basins = [];
    for(var y = 0; y < input.length; y++){
        for(var x = 0; x < input[y].length; x++){
                let isSmallest = true;
                let actualVal = input[y][x];

                //check up
                isSmallest = input[y-1] == undefined ? isSmallest : actualVal < input[y-1][x] ? isSmallest : false;
                // check down
                isSmallest = input[y+1] == undefined ? isSmallest : actualVal < input[y+1][x] ? isSmallest : false;
                // check right
                isSmallest = input[y][x+1] == undefined ? isSmallest : actualVal < input[y][x+1] ? isSmallest : false;
                // check left
                isSmallest = input[y][x-1] == undefined ? isSmallest : actualVal < input[y][x-1] ? isSmallest : false;

                if(isSmallest){
                    lowPointsVal.push(actualVal);
                    basins.push(getBasinSize(input,[y,x]));
                }
            }
        }
    return [lowPointsVal.reduce((acc, val) => acc + val + 1,0),
         basins.sort((a,b) => b - a).slice(0,3).reduce((acc, val) => acc * val,1)];
}

function getBasinSize(input, coord){
    let coordAlreadySeen = {};
    findNexCoord(coord);
    return Object.keys(coordAlreadySeen).length;


    function findNexCoord(coord){
        let y = coord[0];
        let x = coord[1];
        let stringCoord = y.toString() + x.toString();
        let seen = stringCoord in coordAlreadySeen;
        let actualVal = input[y][x];
        if( actualVal != 9 && !seen){
            coordAlreadySeen[stringCoord] = input[y][x];
            //check up
            if(input[y-1] != undefined){
                findNexCoord([y-1,x]);
            }
            // check down
            if(input[y+1] != undefined){
                findNexCoord([y+1,x]);
            }
            // check right
            if(input[y][x+1] != undefined){
                findNexCoord([y,x+1]);
            }
            // check left
            if(input[y][x-1] != undefined){
                findNexCoord([y,x - 1]);
            }
        }
    }
}

console.log(findLowPoints(input));