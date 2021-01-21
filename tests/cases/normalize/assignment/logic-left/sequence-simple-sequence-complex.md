# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > logic-left > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(((a, b).c = (a, $(b)).c = d) && $(true));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
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
  a;
  tmpAssignMemLhsObj = b;
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
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.c = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpArg = $(true);
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: true
 - 2: true
 - 3: 1,{"c":3},"unused",3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
