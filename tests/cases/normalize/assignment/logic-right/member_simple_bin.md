# Preval test case

# member_simple_bin.md

> normalize > assignment > logic-right > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || (a.x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpAssignMemLhsObj = a;
    tmpAssignMemRhs = b + c;
    tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
    tmpNestedPropAssignRhs = tmpAssignMemRhs;
    tmpAssignMemLhsObj_1.x = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
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
var tmpAssignMemLhsObj_1;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = a;
  tmpAssignMemRhs = 5;
  tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
  tmpNestedPropAssignRhs = tmpAssignMemRhs;
  tmpAssignMemLhsObj_1.x = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: true
 - 2: {"x":10},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [true], [{ x: 10 }, 5, 3], null];

