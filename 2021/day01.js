function fileread(filename){            
  let fs = require("fs");  
  let contents= fs.readFileSync(filename,);
  return contents;
}        
    
let input = fileread("day01ex.txt")
    .toString()
    .split("\n")
    .map((x) => parseInt(x, 10));

function solve1(input){
    let output = 0
    let preceding = input[0]
    for(let i=1; i<input.length; i++){
        if(preceding < input[i]){
            output +=1;
        }
        preceding = input[i];
    }
    return output;
}

console.log(solve1(input));
console.log(solve1(input.slice(0,-2).map(function(value, index, elements) {
    return input[index] + input[index + 1] + input[index + 2];
})))

// check zip function + pairs.filter

// let data = require("./data.json");

// const part1 = data.filter((datum, i, arr) => arr[i] > arr[i - 1]).length;

// const part2 = data.filter(
//   (_, i, arr) =>
//     arr.slice(i + 1, i + 4).reduce((x, y) => x + y, 0) >
//     arr.slice(i, i + 3).reduce((x, y) => x + y, 0)
// ).length;

