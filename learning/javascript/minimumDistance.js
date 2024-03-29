'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minimumAbsoluteDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function minimumAbsoluteDifference(arr) {
    // Write your code here
    const newArr = arr.sort()
    let value = Math.abs(newArr[1] - newArr[0])
    for(let i =1;i<= newArr.length - 1;i++){
        const distance = Math.abs(newArr[i] - newArr[i-1])
        if(distance <value){
            value = distance
        }
    }
    return value
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = minimumAbsoluteDifference(arr);

    ws.write(result + '\n');

    ws.end();
}


//SOLVED
function minimumAbsoluteDifference(arr) {
  // Sort the array in ascending order
  arr.sort((a, b) => a - b);

  // Initialize the minimum absolute difference with the maximum possible value
  let minAbsoluteDifference = Number.MAX_SAFE_INTEGER;

  // Iterate through the sorted array and find the minimum absolute difference
  for (let i = 0; i < arr.length - 1; i++) {
    const absoluteDifference = Math.abs(arr[i + 1] - arr[i]);
    minAbsoluteDifference = Math.min(minAbsoluteDifference, absoluteDifference);
  }

  return minAbsoluteDifference;
}