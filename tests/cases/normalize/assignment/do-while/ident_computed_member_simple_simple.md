# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > do-while > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let n = 0;
do { if ($(n++)) break; } while (a = b[$('x')] = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
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
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, 3);
`````

## Result

Should call `$` with:
[
  [0],
  ['x'],
  [1],
  ['x'],
  [2],
  ['x'],
  [3],
  ['x'],
  [4],
  ['x'],
  [5],
  ['x'],
  [6],
  ['x'],
  [7],
  ['x'],
  [8],
  ['x'],
  [9],
  ['x'],
  [10],
  ['x'],
  [11],
  ['x'],
  [12],
  ['x'],
  [13],
  ['x'],
  [14],
  ['x'],
  [15],
  ['x'],
  [16],
  ['x'],
  [17],
  ['x'],
  [18],
  ['x'],
  [19],
  ['x'],
  [20],
  ['x'],
  [21],
  ['x'],
  [22],
  ['x'],
  [23],
  ['x'],
  [24],
  ['x'],
  [25],
  ['x'],
  [26],
  ['x'],
  [27],
  ['x'],
  [28],
  ['x'],
  [29],
  ['x'],
  [30],
  ['x'],
  [31],
  ['x'],
  [32],
  ['x'],
  [33],
  ['x'],
  [34],
  ['x'],
  [35],
  ['x'],
  [36],
  ['x'],
  [37],
  ['x'],
  [38],
  ['x'],
  [39],
  ['x'],
  [40],
  ['x'],
  [41],
  ['x'],
  [42],
  ['x'],
  [43],
  ['x'],
  [44],
  ['x'],
  [45],
  ['x'],
  [46],
  ['x'],
  [47],
  ['x'],
  [48],
  ['x'],
  [49],
  ['x'],
  [50],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Normalized calls: Same

Final output calls: Same
