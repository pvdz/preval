# Preval test case

# member_complex_bin.md

> normalize > assignment > logic-both > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a).x = b + c) && ($(a).x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemLhsObj$3;
var tmpAssignMemLhsObj$4;
var tmpAssignMemLhsObj$5;
var tmpAssignMemRhs;
var tmpAssignMemRhs$1;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpAssignMemRhs = b + c;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignMemLhsObj$3 = $(a);
    tmpAssignMemLhsObj$4 = tmpAssignMemLhsObj$3;
    tmpAssignMemRhs$1 = b + c;
    tmpAssignMemLhsObj$5 = tmpAssignMemLhsObj$4;
    tmpNestedPropAssignRhs = tmpAssignMemRhs$1;
    tmpAssignMemLhsObj$5.x = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemLhsObj$3;
var tmpAssignMemLhsObj$4;
var tmpAssignMemLhsObj$5;
var tmpAssignMemRhs;
var tmpAssignMemRhs$1;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemRhs = 8;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj$3 = $(a);
  tmpAssignMemLhsObj$4 = tmpAssignMemLhsObj$3;
  tmpAssignMemRhs$1 = 8;
  tmpAssignMemLhsObj$5 = tmpAssignMemLhsObj$4;
  tmpNestedPropAssignRhs = tmpAssignMemRhs$1;
  tmpAssignMemLhsObj$5.x = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: {"x":5}
 - 2: 5
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 8 }], [{ x: 8 }], [8], [{ x: 8 }, 8, 3], null];

