function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  }        
      
const input = fileread("day04.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n\n")

function createCellsFromArray(arr){
    let cells = [];
    for(let y = 0; y < arr.length; y++){
        let row = [];
        for(let x = 0; x < arr.length; x++){
            row.push([arr[y][x],false]);
        }
        cells.push(row);
    }
    return cells;
}

class Board {
    constructor(arr){
        this.cells = createCellsFromArray(arr);
    }

    getDeepCopy(){
        return new Board(this.cells.map(row => row.map(cell => cell[0])));
    }

    markeCellsWithThisval(val){
        for(let y = 0; y < this.cells.length; y++){
            for(let x = 0; x < this.cells[y].length; x++){
                if(this.cells[y][x][0] == val){
                    this.cells[y][x][1] = true;
                }
            }
        }
    }

    hasCompleteRow(){
        for(let y = 0; y < this.cells.length; y++){
            let isComplete = true;
            for(let x = 0; x < this.cells.length; x++){
                if(this.cells[y][x][1] == false){
                    isComplete = false;
                    break;
                }
            }

            if(isComplete){
                return isComplete;
            }
        }

        return false;
    }

    sumOfAllUnmarkedNumbers(){
        return this.cells.reduce((acc, line) => acc + line.filter(cell => cell[1] == false).reduce((acc2, cell) => acc2 + cell[0],0) ,0)
    }
}

function solve1(boards){
    let copyBoards = boards.map(board => board.getDeepCopy());
    for(let i = 0; i < randomNumbers.length; i++){
        for(var b = 0; b < copyBoards.length; b++) {
            copyBoards[b].markeCellsWithThisval(randomNumbers[i]);
            if(copyBoards[b].hasCompleteRow()){
                return randomNumbers[i] * copyBoards[b].sumOfAllUnmarkedNumbers();
            }
    
        }
    }
}

function solve2(boards){
    let copyBoards = boards.map(board => board.getDeepCopy());
    for(let i = 0; i < randomNumbers.length; i++){
        for(var b = 0; b < copyBoards.length; b++) {
            copyBoards[b].markeCellsWithThisval(randomNumbers[i]); 
            if(copyBoards.length == 1 && copyBoards[b].hasCompleteRow()){
                return randomNumbers[i] * copyBoards[0].sumOfAllUnmarkedNumbers();
            }  
        }
        copyBoards = copyBoards.filter(b => !b.hasCompleteRow());
    }
}

const randomNumbers = input[0].split(",").map((y) => parseInt(y, 10));


const boards = input
    .slice(1)
    .map(arr => new Board(arr
        .split("\n")
        .map((line) => line
            .split(" ")
            .filter(line => line != "")
            .map((y) => parseInt(y, 10)))));

console.log(solve1(boards));
console.log(solve2(boards));



