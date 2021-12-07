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

let valAlreadyCompute = {};

function calculateSum(number){

    if(number < 1){
        return 0;
    }
    
    if(number in valAlreadyCompute){
        return valAlreadyCompute[number];
    }

    if(number==1){
        return 1;
    }

    let sum = number + calculateSum(number - 1);
    valAlreadyCompute[number] = sum;
    return sum;
}

for(let pos = min; pos <= max; pos++){
    let sumAtThisPosition = input.reduce((acc, val) => acc + calculateSum(Math.abs(val - pos)),0);
    sum = Math.min(sum, sumAtThisPosition);
}

console.log(sum)

// remove calculateSum in the reduce function for part 1