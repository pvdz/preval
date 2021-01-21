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
var tmpNestedPropAssignRhs_1;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
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
    tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
    a;
    tmpNestedAssignObj = b;
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
    tmpNestedPropAssignRhs_1 = tmpAssignMemRhs;
    tmpAssignMemLhsObj_2.c = tmpNestedPropAssignRhs_1;
    tmpArg = tmpNestedPropAssignRhs_1;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs_1;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
  tmpNestedAssignObj = b;
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemRhs = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
  tmpNestedPropAssignRhs_1 = tmpAssignMemRhs;
  tmpAssignMemLhsObj_2.c = tmpNestedPropAssignRhs_1;
  tmpArg = tmpNestedPropAssignRhs_1;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: true
 - 2: 1,{"c":2},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
