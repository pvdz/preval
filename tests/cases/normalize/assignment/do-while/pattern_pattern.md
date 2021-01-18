# Preval test case

# pattern_pattern.md

> normalize > assignment > do-while > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
let n = 0;
do { if ($(n++)) break; } while ([a, b] = [, x, y] = z);
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
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
  arrAssignPatternRhs_1 = z;
  arrPatternSplat_1 = [...arrAssignPatternRhs_1];
  x = arrPatternSplat_1[1];
  tmpNestedComplexRhs = arrPatternSplat_1[2];
  y = tmpNestedComplexRhs;
  arrAssignPatternRhs = tmpNestedComplexRhs;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  tmpNestedComplexRhs_1 = arrPatternSplat[1];
  b = tmpNestedComplexRhs_1;
  ifTestTmp = tmpNestedComplexRhs_1;
} while (ifTestTmp);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
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
  arrAssignPatternRhs_1 = z;
  arrPatternSplat_1 = [...arrAssignPatternRhs_1];
  x = arrPatternSplat_1[1];
  tmpNestedComplexRhs = arrPatternSplat_1[2];
  y = tmpNestedComplexRhs;
  arrAssignPatternRhs = tmpNestedComplexRhs;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  tmpNestedComplexRhs_1 = arrPatternSplat[1];
  b = tmpNestedComplexRhs_1;
  ifTestTmp = tmpNestedComplexRhs_1;
} while (ifTestTmp);
$(a, b, x, y, z);
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

Normalized calls: BAD?!
[[0], '<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
[[0], '<crash[ <ref> is not iterable ]>'];

