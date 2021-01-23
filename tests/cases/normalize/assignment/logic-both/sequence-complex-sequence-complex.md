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
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemLhsObj$3;
var tmpAssignMemLhsObj$4;
var tmpAssignMemLhsObj$5;
var tmpAssignMemRhs;
var tmpAssignMemRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
var tmpNestedPropAssignRhs$1;
var tmpNestedPropAssignRhs$2;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemRhs = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    a;
    tmpAssignMemLhsObj$3 = $(b);
    tmpAssignMemLhsObj$4 = tmpAssignMemLhsObj$3;
    a;
    tmpNestedAssignObj$1 = $(b);
    tmpNestedPropAssignRhs$1 = d;
    tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
    tmpAssignMemRhs$1 = tmpNestedPropAssignRhs$1;
    tmpAssignMemLhsObj$5 = tmpAssignMemLhsObj$4;
    tmpNestedPropAssignRhs$2 = tmpAssignMemRhs$1;
    tmpAssignMemLhsObj$5.c = tmpNestedPropAssignRhs$2;
    tmpArg = tmpNestedPropAssignRhs$2;
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
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemLhsObj$3;
var tmpAssignMemLhsObj$4;
var tmpAssignMemLhsObj$5;
var tmpAssignMemRhs;
var tmpAssignMemRhs$1;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
var tmpNestedPropAssignRhs$1;
var tmpNestedPropAssignRhs$2;
let b = { c: 2 };
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpAssignMemRhs = tmpNestedPropAssignRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj$3 = $(b);
  tmpAssignMemLhsObj$4 = tmpAssignMemLhsObj$3;
  tmpNestedAssignObj$1 = $(b);
  tmpNestedPropAssignRhs$1 = 3;
  tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
  tmpAssignMemRhs$1 = tmpNestedPropAssignRhs$1;
  tmpAssignMemLhsObj$5 = tmpAssignMemLhsObj$4;
  tmpNestedPropAssignRhs$2 = tmpAssignMemRhs$1;
  tmpAssignMemLhsObj$5.c = tmpNestedPropAssignRhs$2;
  tmpArg = tmpNestedPropAssignRhs$2;
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
