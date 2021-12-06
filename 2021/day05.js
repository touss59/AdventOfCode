function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  }        
      
const input = fileread("day05.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map((line) => line
        .split(" -> ")
        .map((part => part
            .split(",").map((y) => parseInt(y)))));

function solve(input){

    function count(dic) {
        let counter = 0;
        for(var key in dic) {
            var value = dic[key];
            if(value > 1){
                counter++;
            }
          }
          return counter;
    }

    let points = {};

    for(let i = 0; i < input.length; i++) {
        let isXNeedToGoUp = input[i][0][0] < input[i][1][0];
        let isYNeedToGoUp = input[i][0][1] < input[i][1][1];
    
        let startX = input[i][0][0];
        let startY = input[i][0][1];

        let endX = input[i][1][0];
        let endY = input[i][1][1];

        let point = startX + "," + startY;
        points[point] = (points[point] || 0 ) + 1;
    
        while(startX != endX || startY != endY){
            startX = startX == endX ? startX : isXNeedToGoUp ? startX + 1 : startX - 1;
            startY = startY == endY ? startY : isYNeedToGoUp ? startY + 1 : startY - 1;
            point = startX + "," + startY;
            points[point] = (points[point] || 0 ) + 1;
        }
    }

    return count(points);
}

console.log(solve(input.filter((line) => line[0][0] == line[1][0] || line[0][1] == line[1][1])));
console.log(solve(input))
  