function fileread(filename)
{            
   var contents= fs.readFileSync(filename);
   return contents;
}        

var fs =require("fs");      
var data= fileread("day01.txt");
var input = data.toString().split("\n").map(function (x) { 
    return parseInt(x, 10); 
  });

function solve1(input){
    var output = 0
    var preceding = input[0]
    for(var i=1; i<input.length; i++){
        if(preceding < input[i]){
            output +=1;
        }
        preceding = input[i];
    }
    return output;
}

function solve2(input){
    var output = 0
    var preceding = input[0] + input[1] + input[2]
    for(var i=1; i< input.length - 2; i++){
        var actual = input[i] + input[i + 1] + input[i + 2]
        if(preceding < actual){
            output +=1;
        }
        preceding = actual;
    }
    return output;
}

console.log(solve1(input));
console.log(solve2(input));

