# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > logic-both > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a[$('x')] = b) && (a[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignedComputedObj_1;
var tmpAssignedComputedProp_1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignedComputedObj = a;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = b;
  let tmpAssignLogicStmtOr = b;
  if (tmpAssignLogicStmtOr) {
    tmpAssignedComputedObj_1 = a;
    tmpAssignedComputedProp_1 = $('x');
    tmpNestedPropAssignRhs = b;
    tmpAssignedComputedObj_1[tmpAssignedComputedProp_1] = tmpNestedPropAssignRhs;
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
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignedComputedObj_1;
var tmpAssignedComputedProp_1;
let a = { x: 10 };
tmpAssignedComputedObj = a;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = 2;
tmpAssignedComputedObj_1 = a;
tmpAssignedComputedProp_1 = $('x');
tmpNestedPropAssignRhs = 2;
tmpAssignedComputedObj_1[tmpAssignedComputedProp_1] = tmpNestedPropAssignRhs;
tmpArg = tmpNestedPropAssignRhs;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['x'], ['x'], [2], [{ x: 10, undefined: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
