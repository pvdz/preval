# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > logic-left > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(((a, $(b)).c = (a, $(b)).c = d) && $(true));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  {
    a;
    tmpAssignMemLhsObj = $(b);
    a;
    tmpNestedAssignObj = $(b);
    tmpNestedAssignObj.c = d;
    tmpAssignMemRhs = d;
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  }
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    tmpArg = $(true);
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.c = 3;
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpArg = $(true);
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: {"c":2}
 - 2: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same