# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > do-while > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
let n = 0;
do { if ($(n++)) break; } while (a = b.x = $(c).y = $(d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
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
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = $(c);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs$1 = $(d);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignObj;
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
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignObj = $(3);
  tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs$1 = $(4);
  tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 3
 - 2: 4
 - 3: 1
 - 4: 4,{"x":4},3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
