# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > logic-right > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$($(true) || ((a, b).c = (a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj_1;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    a;
    tmpAssignMemLhsObj = b;
    a;
    tmpNestedAssignObj = b;
    tmpNestedAssignObj.c = d;
    tmpAssignMemRhs = d;
    tmpNestedAssignObj_1 = tmpAssignMemLhsObj;
    tmpNestedAssignObj_1.c = tmpAssignMemRhs;
    tmpArg = tmpAssignMemRhs;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj_1;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = b;
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = 3;
  tmpAssignMemRhs = 3;
  tmpNestedAssignObj_1 = tmpAssignMemLhsObj;
  tmpNestedAssignObj_1.c = tmpAssignMemRhs;
  tmpArg = tmpAssignMemRhs;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[true], [3], '<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
