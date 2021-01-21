# Preval test case

# member_complex_bin.md

> normalize > assignment > do-while > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 0;
do { if ($(n++)) break; } while ($(a).x = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
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
  tmpNestedAssignMemberObj = $(a);
  tmpNestedAssignMemberRhs = b + c;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  ifTestTmp = tmpNestedAssignMemberRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  tmpNestedAssignMemberObj = $(a);
  tmpNestedAssignMemberRhs = 5;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  ifTestTmp = tmpNestedAssignMemberRhs;
} while (ifTestTmp);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"x":5}
 - 2: 1
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[0], [{ x: 5 }], [1], [{ x: 5 }, 5, 3], null];

