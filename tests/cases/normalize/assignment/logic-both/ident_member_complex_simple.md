# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > logic-both > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = $(b).x = c) && (a = $(b).x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignObj_1 = $(b);
    tmpNestedPropAssignRhs_1 = c;
    tmpNestedAssignObj_1.x = tmpNestedPropAssignRhs_1;
    a = tmpNestedPropAssignRhs_1;
    tmpArg = tmpNestedPropAssignRhs_1;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignObj_1 = $(b);
  tmpNestedPropAssignRhs_1 = 3;
  tmpNestedAssignObj_1.x = tmpNestedPropAssignRhs_1;
  a = tmpNestedPropAssignRhs_1;
  tmpArg = tmpNestedPropAssignRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: {"x":3}
 - 2: 3
 - 3: 3,{"x":3},3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
