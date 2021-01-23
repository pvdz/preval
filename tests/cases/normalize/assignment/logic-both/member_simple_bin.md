# Preval test case

# member_simple_bin.md

> normalize > assignment > logic-both > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a.x = b + c) && (a.x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs$1;
var tmpAssignMemLhsObj$3;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = a;
  tmpAssignMemRhs = b + c;
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignMemLhsObj$2 = a;
    tmpAssignMemRhs$1 = b + c;
    tmpAssignMemLhsObj$3 = tmpAssignMemLhsObj$2;
    tmpNestedPropAssignRhs = tmpAssignMemRhs$1;
    tmpAssignMemLhsObj$3.x = tmpNestedPropAssignRhs;
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
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs$1;
var tmpAssignMemLhsObj$3;
let a = { x: 10 };
tmpAssignMemLhsObj = a;
tmpAssignMemRhs = 8;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj$2 = a;
  tmpAssignMemRhs$1 = 8;
  tmpAssignMemLhsObj$3 = tmpAssignMemLhsObj$2;
  tmpNestedPropAssignRhs = tmpAssignMemRhs$1;
  tmpAssignMemLhsObj$3.x = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: 5
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[8], [{ x: 8 }, 8, 3], null];

