# Preval test case

# sequence-complex-sequence-simple.md

> normalize > assignment > logic-right > sequence-complex-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$($(true) || ((a, $(b)).c = (a, b).c = d));
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
let c = 'unused';
let d = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    a;
    tmpAssignMemLhsObj = $(b);
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
  tmpAssignMemLhsObj = $(b);
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = 3;
  tmpAssignMemRhs = 3;
  tmpNestedAssignObj_1 = tmpAssignMemLhsObj;
  tmpNestedAssignObj_1.c = tmpAssignMemRhs;
  tmpArg = tmpAssignMemRhs;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: {"c":3}
 - 2: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
