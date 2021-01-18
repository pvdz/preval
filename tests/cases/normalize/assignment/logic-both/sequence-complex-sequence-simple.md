# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > logic-both > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(((a, $(b)).c = (a, b).c = d) && ((a, $(b)).c = (a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpNestedAssignObj_1;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  a;
  tmpAssignMemLhsObj = $(b);
  a;
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = d;
  tmpAssignMemRhs = d;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    a;
    tmpAssignMemLhsObj_1 = $(b);
    a;
    tmpNestedAssignObj_1 = b;
    tmpNestedAssignObj_1.c = d;
    tmpAssignMemRhs_1 = d;
    tmpNestedPropAssignRhs = tmpAssignMemRhs_1;
    tmpAssignMemLhsObj_1.c = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpNestedAssignObj_1;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj_1 = $(b);
  tmpNestedAssignObj_1 = b;
  tmpNestedAssignObj_1.c = 3;
  tmpAssignMemRhs_1 = 3;
  tmpNestedPropAssignRhs = tmpAssignMemRhs_1;
  tmpAssignMemLhsObj_1.c = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[{ c: 3 }], "<crash[ Cannot set property 'c' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
