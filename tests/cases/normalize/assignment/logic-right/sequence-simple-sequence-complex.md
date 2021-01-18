# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > logic-right > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$($(true) || ((a, b).c = (a, $(b)).c = d));
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
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    a;
    tmpAssignMemLhsObj = b;
    a;
    tmpNestedAssignObj = $(b);
    tmpNestedAssignObj.c = d;
    tmpAssignMemRhs = d;
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
    tmpArg = tmpAssignMemRhs;
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
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = b;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = 3;
  tmpAssignMemRhs = 3;
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  tmpArg = tmpAssignMemRhs;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[true], [{ c: 2 }], "<crash[ Cannot set property 'c' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
