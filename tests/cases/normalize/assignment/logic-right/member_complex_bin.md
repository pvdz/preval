# Preval test case

# member_complex_bin.md

> normalize > assignment > logic-right > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || ($(a).x = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    tmpAssignMemRhs = b + c;
    tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
    tmpNestedPropAssignRhs = tmpAssignMemRhs;
    tmpAssignMemLhsObj$2.x = tmpNestedPropAssignRhs;
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
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpAssignMemRhs = 5;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpNestedPropAssignRhs = tmpAssignMemRhs;
  tmpAssignMemLhsObj$2.x = tmpNestedPropAssignRhs;
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

