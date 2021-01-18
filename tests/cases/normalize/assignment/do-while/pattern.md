# Preval test case

# pattern.md

> normalize > assignment > do-while > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let n = 0;
do { if ($(n++)) break; } while ([x, y] = z);
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
    tmpArg = tmpPostfixArg;
    let ifTestTmp_1 = $(tmpArg);
    if (ifTestTmp_1) {
      break;
    }
  }
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
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
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
  [3],
  [4],
  [5],
  [6],
  [7],
  [8],
  [9],
  [10],
  [11],
  [12],
  [13],
  [14],
  [15],
  [16],
  [17],
  [18],
  [19],
  [20],
  [21],
  [22],
  [23],
  [24],
  [25],
  [26],
  [27],
  [28],
  [29],
  [30],
  [31],
  [32],
  [33],
  [34],
  [35],
  [36],
  [37],
  [38],
  [39],
  [40],
  [41],
  [42],
  [43],
  [44],
  [45],
  [46],
  [47],
  [48],
  [49],
  [50],
  [51],
  [52],
  [53],
  [54],
  [55],
  [56],
  [57],
  [58],
  [59],
  [60],
  [61],
  [62],
  [63],
  [64],
  [65],
  [66],
  [67],
  [68],
  [69],
  [70],
  [71],
  [72],
  [73],
  [74],
  [75],
  [76],
  [77],
  [78],
  [79],
  [80],
  [81],
  [82],
  [83],
  [84],
  [85],
  [86],
  [87],
  [88],
  [89],
  [90],
  [91],
  [92],
  [93],
  [94],
  [95],
  [96],
  [97],
  [98],
  [99],
  [100],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Normalized calls: Same

Final output calls: Same
