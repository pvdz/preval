# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > logic-left > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = b.x = c) && $(true));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  tmpNestedPropAssignRhs = c;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
  if (tmpAssignLogicStmtOr) {
    tmpArg = $(true);
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
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
tmpNestedPropAssignRhs = 3;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
if (tmpAssignLogicStmtOr) {
  tmpArg = $(true);
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: null
 - 2: 3,{"x":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
