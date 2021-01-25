# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > do-while > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
let n = 0;
do { if ($(n++)) break; } while (a = $(b).x = $(c).y = $(d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedComplexRhs;
var tmpPostfixArg;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(c);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignMemberRhs$1 = $(d);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedComplexRhs;
var tmpPostfixArg;
let a = 1;
let b = { x: 2 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  const tmpIfTest = $(tmpArg);
  if (tmpIfTest) {
    break;
  }
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj$1 = $(3);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignMemberRhs$1 = $(4);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  ifTestTmp = tmpNestedComplexRhs;
} while (ifTestTmp);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"x":4}
 - 2: 3
 - 3: 4
 - 4: 1
 - 5: 4,{"x":4},3,4
 - 6: undefined

Normalized calls: Same

Final output calls: Same
