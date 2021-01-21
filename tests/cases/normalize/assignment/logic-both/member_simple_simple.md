# Preval test case

# member_simple_simple.md

> normalize > assignment > logic-both > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a.x = b) && (a.x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  a.x = b;
  let tmpAssignLogicStmtOr = b;
  if (tmpAssignLogicStmtOr) {
    tmpNestedPropAssignRhs = b;
    a.x = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
let a = { x: 10 };
a.x = 2;
tmpNestedPropAssignRhs = 2;
a.x = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: {"x":2},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same