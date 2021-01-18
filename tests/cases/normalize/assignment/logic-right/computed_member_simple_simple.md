# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > logic-right > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || (a[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpAssignedComputedObj = a;
    tmpAssignedComputedProp = $('x');
    tmpNestedPropAssignRhs = b;
    tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignedComputedObj = a;
  tmpAssignedComputedProp = $('x');
  tmpNestedPropAssignRhs = 2;
  tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[true], ['x'], [2], [{ x: 10, undefined: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
