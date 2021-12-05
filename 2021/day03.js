function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  }        
      
const input = fileread("day03.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map((x) => x.split("").map((y) => parseInt(y, 10)));

function getNumberOfOccurences(arr,search) {
    return arr.reduce((n, val) =>n + (val === search), 0);
}

function getMostFrequentBit(arr) {
    let numOfOne = getNumberOfOccurences(arr,1);
    let numOfZero = getNumberOfOccurences(arr,0); 
    return numOfOne >=  numOfZero ? 1 : 0;
}

function getLeastFrequentBit(arr) {
    let numOfOne = getNumberOfOccurences(arr,1);
    let numOfZero = getNumberOfOccurences(arr,0); 
    return ((numOfZero <= numOfOne && numOfZero != 0) || numOfOne==0) ? 0 : 1;
}

function getNumberFromBitsArray(arr) {
    let result = 0;
    let reversArray = arr.map((x) => parseInt(x, 10)).reverse();
    for (let i = 0; i < reversArray.length; i++) {
        result += Math.pow(2,i)*reversArray[i];
    }
    return result;
}

function toggleBits(bits) {
    return bits.map(b => b^1);
}

function solve1(arr){
    let result = []

    for(let x= 0 ; x< arr[0].length ; x++){
        let list = [];
        for(let y= 0 ; y < arr.length ; y++){
            list.push(arr[y][x]);
        }
        result.push(getMostFrequentBit(list));
    }
    
    return getNumberFromBitsArray(toggleBits(result))*getNumberFromBitsArray(result);
}

function solve2(arr){

    let input = arr;
    let input2 = arr;

    for(let x= 0 ; x< input[0].length ; x++){
        let list = [];
        for(let y= 0 ; y < input.length ; y++){
            list.push(input[y][x]);
        }
        let mostFrequent = getMostFrequentBit(list);
        input = input.filter(number => number[x] == mostFrequent);
    }

    for(let x= 0 ; x< input2[0].length ; x++){
        let list = [];
        for(let y= 0 ; y < input2.length ; y++){
            list.push(input2[y][x]);
        }
        let leastFrequent = getLeastFrequentBit(list);
        input2 = input2.filter(number => number[x] == leastFrequent);
    }

    return getNumberFromBitsArray(input[0])*getNumberFromBitsArray(input2[0]);
}


console.log(solve1(input))
console.log(solve2(input))


// deep copy => JSON.parse(JSON.stringify(nestedArray)); 

// function getMostFrequent(arr) {
//     const hashmap = arr.reduce( (acc, val) => {
//         acc[val] = (acc[val] || 0 ) + 1;
//         return acc;
//     },{})
//     return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
// }