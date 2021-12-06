function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  }        
      
let input = fileread("day06.txt")
    .toString()
    .split(",").map((y) => parseInt(y));

let count = 0;
let newLanterns = [];

for(let i=0; i<input.length; i++){
    newLanterns[input[i]] = (newLanterns[input[i]] || 0) + 1;
}

while(count < 256){
    let nexIteration = []
    for(let i=0; i <= 8; i++){
        numAtStage = newLanterns[i];
        if(numAtStage!= undefined){
            if(i!=0){
                nexIteration[i-1] = (nexIteration[i-1] || 0) + numAtStage;
            }else{
                nexIteration[8] = numAtStage;
                nexIteration[6] = numAtStage;
            }
        }
    }
    newLanterns = nexIteration;
    count++;
}
console.log(newLanterns.reduce((acc, val) => acc + val));