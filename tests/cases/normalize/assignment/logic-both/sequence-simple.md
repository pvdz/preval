# Preval test case

# sequence-simple.md

> normalize > assignment > logic-both > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
$(((a, b).c = d) && ((a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  a;
  tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.c = d;
  let tmpAssignLogicStmtOr = d;
  if (tmpAssignLogicStmtOr) {
    a;
    tmpAssignMemLhsObj_1 = b;
    tmpNestedPropAssignRhs = d;
    tmpAssignMemLhsObj_1.c = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
let b = { c: 2 };
tmpAssignMemLhsObj = b;
tmpAssignMemLhsObj.c = 3;
tmpAssignMemLhsObj_1 = b;
tmpNestedPropAssignRhs = 3;
tmpAssignMemLhsObj_1.c = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
