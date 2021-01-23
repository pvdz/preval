# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > logic-right > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$($(true) || ((a, b).c = (a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs$1;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
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
    tmpAssignMemLhsObj = b;
    tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    a;
    tmpNestedAssignObj = b;
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
    tmpNestedPropAssignRhs$1 = tmpAssignMemRhs;
    tmpAssignMemLhsObj$2.c = tmpNestedPropAssignRhs$1;
    tmpArg = tmpNestedPropAssignRhs$1;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs$1;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpNestedAssignObj = b;
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemRhs = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpNestedPropAssignRhs$1 = tmpAssignMemRhs;
  tmpAssignMemLhsObj$2.c = tmpNestedPropAssignRhs$1;
  tmpArg = tmpNestedPropAssignRhs$1;
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
