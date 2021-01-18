# Preval test case

# ident_sequence_simple.md

> normalize > assignment > do-while > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = ($(b), c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
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
  $(b);
  tmpNestedComplexRhs = c;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedComplexRhs;
let a = 1;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = n;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  $(2);
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[
  [0],
  [2],
  [1],
  [2],
  [2],
  [2],
  [3],
  [2],
  [4],
  [2],
  [5],
  [2],
  [6],
  [2],
  [7],
  [2],
  [8],
  [2],
  [9],
  [2],
  [10],
  [2],
  [11],
  [2],
  [12],
  [2],
  [13],
  [2],
  [14],
  [2],
  [15],
  [2],
  [16],
  [2],
  [17],
  [2],
  [18],
  [2],
  [19],
  [2],
  [20],
  [2],
  [21],
  [2],
  [22],
  [2],
  [23],
  [2],
  [24],
  [2],
  [25],
  [2],
  [26],
  [2],
  [27],
  [2],
  [28],
  [2],
  [29],
  [2],
  [30],
  [2],
  [31],
  [2],
  [32],
  [2],
  [33],
  [2],
  [34],
  [2],
  [35],
  [2],
  [36],
  [2],
  [37],
  [2],
  [38],
  [2],
  [39],
  [2],
  [40],
  [2],
  [41],
  [2],
  [42],
  [2],
  [43],
  [2],
  [44],
  [2],
  [45],
  [2],
  [46],
  [2],
  [47],
  [2],
  [48],
  [2],
  [49],
  [2],
  [50],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Normalized calls: BAD?!
[
  [1],
  [2],
  [2],
  [2],
  [3],
  [2],
  [4],
  [2],
  [5],
  [2],
  [6],
  [2],
  [7],
  [2],
  [8],
  [2],
  [9],
  [2],
  [10],
  [2],
  [11],
  [2],
  [12],
  [2],
  [13],
  [2],
  [14],
  [2],
  [15],
  [2],
  [16],
  [2],
  [17],
  [2],
  [18],
  [2],
  [19],
  [2],
  [20],
  [2],
  [21],
  [2],
  [22],
  [2],
  [23],
  [2],
  [24],
  [2],
  [25],
  [2],
  [26],
  [2],
  [27],
  [2],
  [28],
  [2],
  [29],
  [2],
  [30],
  [2],
  [31],
  [2],
  [32],
  [2],
  [33],
  [2],
  [34],
  [2],
  [35],
  [2],
  [36],
  [2],
  [37],
  [2],
  [38],
  [2],
  [39],
  [2],
  [40],
  [2],
  [41],
  [2],
  [42],
  [2],
  [43],
  [2],
  [44],
  [2],
  [45],
  [2],
  [46],
  [2],
  [47],
  [2],
  [48],
  [2],
  [49],
  [2],
  [50],
  [2],
  [51],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Final output calls: BAD!!
[
  [1],
  [2],
  [2],
  [2],
  [3],
  [2],
  [4],
  [2],
  [5],
  [2],
  [6],
  [2],
  [7],
  [2],
  [8],
  [2],
  [9],
  [2],
  [10],
  [2],
  [11],
  [2],
  [12],
  [2],
  [13],
  [2],
  [14],
  [2],
  [15],
  [2],
  [16],
  [2],
  [17],
  [2],
  [18],
  [2],
  [19],
  [2],
  [20],
  [2],
  [21],
  [2],
  [22],
  [2],
  [23],
  [2],
  [24],
  [2],
  [25],
  [2],
  [26],
  [2],
  [27],
  [2],
  [28],
  [2],
  [29],
  [2],
  [30],
  [2],
  [31],
  [2],
  [32],
  [2],
  [33],
  [2],
  [34],
  [2],
  [35],
  [2],
  [36],
  [2],
  [37],
  [2],
  [38],
  [2],
  [39],
  [2],
  [40],
  [2],
  [41],
  [2],
  [42],
  [2],
  [43],
  [2],
  [44],
  [2],
  [45],
  [2],
  [46],
  [2],
  [47],
  [2],
  [48],
  [2],
  [49],
  [2],
  [50],
  [2],
  [51],
  '<crash[ Loop aborted by Preval test runner ]>',
];

