function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day07.txt")
    .toString()
    .split(",").map((y) => parseInt(y));

let max = Math.max(...input)
let min = Math.min(...input)

let sum = Number.MAX_VALUE;


function calculateSum(number){
    return number * (number+1)/2;
}

for(let pos = min; pos <= max; pos++){
    let sumAtThisPosition = input.reduce((acc, val) => acc + calculateSum(Math.abs(val - pos)),0);
    sum = Math.min(sum, sumAtThisPosition);
}


console.log(sum)

// remove calculateSum in the reduce function for part 1