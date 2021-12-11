function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day08.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n")
    .map((line) => line.split("|").map((part) => part.split(" ").filter((element) => element != '')));

// part 1
let uniqSizes = [2,3,4,7];
console.log(input.reduce((acc, line) => acc + line[1].filter((x) => uniqSizes.includes(x.length)).length,0));

// part 2
console.log(input.reduce((acc, item) => acc + solveRow(item),0));

function solveRow(row){
  let cf;
  let bd;
  let dic = {};

  let uniqSignals = row[0];
  let numbersToDecrypt = row[1];

  // set the dictionary
  setSpecificNumbers(uniqSignals);
  setOtherNumbers(uniqSignals);

  return parseInt(numbersToDecrypt.reduce((acc, n) => acc + dic[n.split('').sort().join('')],''));;

  function setSpecificNumbers(row){
    row = row.sort((a, b) => - b.length + a.length);
    for (let i = 0; i < row.length; i++){
      switch (row[i].length){
        case 2:
          dic[row[i].split('').sort().join('')] = '1';
          cf = row[i].split('');
          break;
  
        case 3:
          dic[row[i].split('').sort().join('')] = '7';
          break;
  
        case 4:
          dic[row[i].split('').sort().join('')] = '4';
          bd = row[i].split('').filter((symbole)=> !cf.includes(symbole));
          break;
  
        case 7:
          dic[row[i].split('').sort().join('')] = '8';
          break;
        
      }
    }
  }

  function setOtherNumbers(row){
    setNumbersOfLength3(row);
    setNumbersOfLength6(row);
  }

  function setNumbersOfLength3(row){
    let numbersSize3 = row.filter((number) => number.length == 5).map((number) => number.split(''))
    let number5 = numbersSize3.find((number) => checkIfContainBD(number));
    dic[number5.sort().join('')] = '5';
    numbersSize3 = numbersSize3.filter((number) => number != number5);
    let number3 = numbersSize3.find((number) => checkIfContainCF(number));
    dic[number3.sort().join('')] = '3';
    let number2 = numbersSize3.find((number) => number != number3);
    dic[number2.sort().join('')] = '2';
  }

  function setNumbersOfLength6(row){
    let numbersSize6 = row.filter((number) => number.length == 6).map((number) => number.split(''));
    let number6 = numbersSize6.find((number) => !checkIfContainCF(number));
    dic[number6.sort().join('')] = '6';
    numbersSize6 = numbersSize6.filter((number) => number != number6);
    let number0 = numbersSize6.find((number) => !checkIfContainBD(number));
    dic[number0.sort().join('')] = '0';
    let number9 = numbersSize6.find((number) => number != number0);
    dic[number9.sort().join('')] = '9';
  }

  function checkIfContainBD(number){
    return number.filter((car) => bd.includes(car)).length == 2;
  }
  
  function checkIfContainCF(number){
    return number.filter((car) => cf.includes(car)).length == 2;
  }
}
