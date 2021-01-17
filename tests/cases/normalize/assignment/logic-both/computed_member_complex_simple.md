# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > logic-both > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a)[$('x')] = b) && ($(a)[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpAssignedComputedObj_1;
var tmpAssignedComputedProp_1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemRhs = b;
  tmpAssignedComputedObj = tmpAssignMemLhsObj;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
  let tmpAssignLogicStmtOr = tmpAssignMemRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignMemLhsObj_1 = $(a);
    tmpAssignMemRhs_1 = b;
    tmpAssignedComputedObj_1 = tmpAssignMemLhsObj_1;
    tmpAssignedComputedProp_1 = $('x');
    tmpAssignedComputedObj_1[tmpAssignedComputedProp_1] = tmpAssignMemRhs_1;
    tmpArg = tmpAssignMemRhs_1;
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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs_1;
var tmpAssignedComputedObj_1;
var tmpAssignedComputedProp_1;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 2;
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
let tmpAssignLogicStmtOr = tmpAssignMemRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj_1 = $(a);
  tmpAssignMemRhs_1 = 2;
  tmpAssignedComputedObj_1 = tmpAssignMemLhsObj_1;
  tmpAssignedComputedProp_1 = $('x');
  tmpAssignedComputedObj_1[tmpAssignedComputedProp_1] = tmpAssignMemRhs_1;
  tmpArg = tmpAssignMemRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 2, 3);
`````
