function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  }        
      
const input = fileread("day02.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map((x) => x.split(" "));


function solve1(input){
    let horizontal = 0;
    let depth = 0;
    
    for(let [t,x] of input) {
        let xParse = parseInt(x, 10);
        switch(t) {
            case 'forward':
                horizontal += xParse;
                break;
            case 'down':
                depth += xParse;
                break;
            case 'up':
                depth -= xParse;
                break;
        }
    }
    return horizontal*depth;
}

function solve2(input) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    for(let [t,x] of input) {
        let xParse = parseInt(x, 10);
        switch(t) {
            case 'forward':
                horizontal += xParse;
                depth+=(aim*xParse);
                break;
            case 'down':
                aim += xParse;
                break;
            case 'up':
                aim -= xParse;
                break;
        }
    }
    return horizontal*depth;
}



console.log(solve1(input));
console.log(solve2(input));





