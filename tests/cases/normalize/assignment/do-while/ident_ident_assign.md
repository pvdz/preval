# Preval test case

# ident_ident_assign.md

> normalize > assignment > do-while > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
let n = 0;
do { if ($(n++)) break; } while (a = b = $(c).y = $(d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
var tmpPostfixArg;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let n = 0;
do {
  {
    tmpPostfixArg = n;
    n = n + 1;
    tmpArg = tmpPostfixArg;
    let ifTestTmp$1 = $(tmpArg);
    if (ifTestTmp$1) {
      break;
    }
  }
  tmpNestedAssignObj = $(c);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(d);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, c);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
var tmpPostfixArg;
let a = 1;
let b = 2;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp$1 = $(tmpArg);
  if (ifTestTmp$1) {
    break;
  }
  tmpNestedAssignObj = $(3);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(4);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs$1 = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 3
 - 2: 4
 - 3: 1
 - 4: 4,4,3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
