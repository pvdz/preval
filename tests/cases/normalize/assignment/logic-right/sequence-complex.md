# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$($(true) || ((a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    a;
    tmpAssignMemLhsObj = $(b);
    tmpAssignMemRhs = d;
    tmpNestedAssignObj = tmpAssignMemLhsObj;
    tmpNestedAssignObj.c = tmpAssignMemRhs;
    tmpArg = tmpAssignMemRhs;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let b = { c: 2 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemRhs = 3;
  tmpNestedAssignObj = tmpAssignMemLhsObj;
  tmpNestedAssignObj.c = tmpAssignMemRhs;
  tmpArg = tmpAssignMemRhs;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: {"c":2}
 - 2: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same