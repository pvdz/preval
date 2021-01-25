# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > do-while > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
let n = 0;
do { if ($(n++)) break; } while (a = b.x = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpDoWhileTest;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
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
  tmpNestedAssignMemberRhs = c + d;
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
var tmpNestedAssignMemberRhs;
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
  tmpNestedAssignMemberRhs = 7;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: 1
 - 2: 7,{"x":7},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[0], [1], [7, { x: 7 }, 7], null];

