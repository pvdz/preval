# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > logic-both > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(((a, $(b)).c = (a, $(b)).c = d) && ((a, $(b)).c = (a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs_2;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpAssignMemLhsObj_3;
var tmpAssignMemLhsObj_4;
var tmpAssignMemRhs_1;
var tmpAssignMemLhsObj_5;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemRhs = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
  tmpAssignMemLhsObj_2.c = tmpAssignMemRhs;
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    a;
    tmpAssignMemLhsObj_3 = $(b);
    tmpAssignMemLhsObj_4 = tmpAssignMemLhsObj_3;
    a;
    tmpNestedAssignObj_1 = $(b);
    tmpNestedPropAssignRhs_1 = d;
    tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs_1;
    tmpAssignMemRhs_1 = tmpNestedPropAssignRhs_1;
    tmpAssignMemLhsObj_5 = tmpAssignMemLhsObj_4;
    tmpNestedPropAssignRhs_2 = tmpAssignMemRhs_1;
    tmpAssignMemLhsObj_5.c = tmpNestedPropAssignRhs_2;
    tmpArg = tmpNestedPropAssignRhs_2;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs_2;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpAssignMemLhsObj_3;
var tmpAssignMemLhsObj_4;
var tmpAssignMemRhs_1;
var tmpAssignMemLhsObj_5;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.c = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj_3 = $(b);
  tmpAssignMemLhsObj_4 = tmpAssignMemLhsObj_3;
  tmpNestedAssignObj_1 = $(b);
  tmpNestedPropAssignRhs_1 = 3;
  tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs_1;
  tmpAssignMemRhs_1 = tmpNestedPropAssignRhs_1;
  tmpAssignMemLhsObj_5 = tmpAssignMemLhsObj_4;
  tmpNestedPropAssignRhs_2 = tmpAssignMemRhs_1;
  tmpAssignMemLhsObj_5.c = tmpNestedPropAssignRhs_2;
  tmpArg = tmpNestedPropAssignRhs_2;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: {"c":3}
 - 3: {"c":3}
 - 4: 3
 - 5: 1,{"c":3},"unused",3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
