# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > do-while > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let n = 0;
do { if ($(n++)) break; } while ([x, y] = ($(x), $(y), z));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 0;
do {
  {
    tmpPostfixArg = n;
    n = n + 1;
    tmpArg = n;
    let ifTestTmp_1 = $(tmpArg);
    if (ifTestTmp_1) {
      break;
    }
  }
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  tmpNestedComplexRhs = arrPatternSplat[1];
  y = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = n;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  tmpNestedComplexRhs = arrPatternSplat[1];
  y = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(x, y, z);
`````

## Result

Should call `$` with:
[
  [0],
  [1],
  [2],
  [1],
  [10],
  [20],
  [2],
  [10],
  [20],
  [3],
  [10],
  [20],
  [4],
  [10],
  [20],
  [5],
  [10],
  [20],
  [6],
  [10],
  [20],
  [7],
  [10],
  [20],
  [8],
  [10],
  [20],
  [9],
  [10],
  [20],
  [10],
  [10],
  [20],
  [11],
  [10],
  [20],
  [12],
  [10],
  [20],
  [13],
  [10],
  [20],
  [14],
  [10],
  [20],
  [15],
  [10],
  [20],
  [16],
  [10],
  [20],
  [17],
  [10],
  [20],
  [18],
  [10],
  [20],
  [19],
  [10],
  [20],
  [20],
  [10],
  [20],
  [21],
  [10],
  [20],
  [22],
  [10],
  [20],
  [23],
  [10],
  [20],
  [24],
  [10],
  [20],
  [25],
  [10],
  [20],
  [26],
  [10],
  [20],
  [27],
  [10],
  [20],
  [28],
  [10],
  [20],
  [29],
  [10],
  [20],
  [30],
  [10],
  [20],
  [31],
  [10],
  [20],
  [32],
  [10],
  [20],
  [33],
  [10],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Normalized calls: BAD?!
[
  [1],
  [1],
  [2],
  [2],
  [10],
  [20],
  [3],
  [10],
  [20],
  [4],
  [10],
  [20],
  [5],
  [10],
  [20],
  [6],
  [10],
  [20],
  [7],
  [10],
  [20],
  [8],
  [10],
  [20],
  [9],
  [10],
  [20],
  [10],
  [10],
  [20],
  [11],
  [10],
  [20],
  [12],
  [10],
  [20],
  [13],
  [10],
  [20],
  [14],
  [10],
  [20],
  [15],
  [10],
  [20],
  [16],
  [10],
  [20],
  [17],
  [10],
  [20],
  [18],
  [10],
  [20],
  [19],
  [10],
  [20],
  [20],
  [10],
  [20],
  [21],
  [10],
  [20],
  [22],
  [10],
  [20],
  [23],
  [10],
  [20],
  [24],
  [10],
  [20],
  [25],
  [10],
  [20],
  [26],
  [10],
  [20],
  [27],
  [10],
  [20],
  [28],
  [10],
  [20],
  [29],
  [10],
  [20],
  [30],
  [10],
  [20],
  [31],
  [10],
  [20],
  [32],
  [10],
  [20],
  [33],
  [10],
  [20],
  [34],
  [10],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Final output calls: BAD!!
[
  [1],
  [1],
  [2],
  [2],
  [10],
  [20],
  [3],
  [10],
  [20],
  [4],
  [10],
  [20],
  [5],
  [10],
  [20],
  [6],
  [10],
  [20],
  [7],
  [10],
  [20],
  [8],
  [10],
  [20],
  [9],
  [10],
  [20],
  [10],
  [10],
  [20],
  [11],
  [10],
  [20],
  [12],
  [10],
  [20],
  [13],
  [10],
  [20],
  [14],
  [10],
  [20],
  [15],
  [10],
  [20],
  [16],
  [10],
  [20],
  [17],
  [10],
  [20],
  [18],
  [10],
  [20],
  [19],
  [10],
  [20],
  [20],
  [10],
  [20],
  [21],
  [10],
  [20],
  [22],
  [10],
  [20],
  [23],
  [10],
  [20],
  [24],
  [10],
  [20],
  [25],
  [10],
  [20],
  [26],
  [10],
  [20],
  [27],
  [10],
  [20],
  [28],
  [10],
  [20],
  [29],
  [10],
  [20],
  [30],
  [10],
  [20],
  [31],
  [10],
  [20],
  [32],
  [10],
  [20],
  [33],
  [10],
  [20],
  [34],
  [10],
  '<crash[ Loop aborted by Preval test runner ]>',
];

