function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day10.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map((row) => row.split(''));

let symbolsValues = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

let openedClosedSymbolsPairs = {
    '(':')',
    '[':']',
    '{':'}',
    '<':'>'
};

// part 1
console.log(input
    .map(row => solve(row))
    .filter(result => !Array.isArray(result))
    .map(result => symbolsValues[result])
    .reduce((acc, result) => acc + result, 0));

// part 2

let symbolsValuesPart2 = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
};

let incompleteLines = input
    .map(row => solve(row))
    .filter(result => Array.isArray(result) && result.length > 0)
    .map(result => result.reduce((acc, symbol) => acc*5 + symbolsValuesPart2[symbol], 0))
    .sort((a,b) => a - b);


console.log(incompleteLines[(incompleteLines.length -1) / 2]);

function solve(row) {
    let closedSymbolsNeedToSee = [];

    for(var i = 0; i < row.length; i++) {
        let symbol = row[i];

        if(Object.keys(openedClosedSymbolsPairs).includes(symbol)) {
            closedSymbolsNeedToSee.push(openedClosedSymbolsPairs[symbol]);
        }else{
            
            if(symbol != closedSymbolsNeedToSee.pop()){
                return symbol;
            }
        }

    }
    return closedSymbolsNeedToSee.reverse(); 
}