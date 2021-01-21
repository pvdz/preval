# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > logic-both > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(($(a)[$('x')] = b + c) && ($(a)[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemLhsObj_2;
var tmpAssignComMemLhsObj_1;
var tmpAssignComMemLhsProp_1;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
var tmpAssignMemLhsObj_3;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignMemLhsObj = $(a);
  tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComputedObj = tmpAssignComMemLhsObj;
  tmpAssignComputedProp = tmpAssignComMemLhsProp;
  tmpAssignComputedRhs = b + c;
  tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
  tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
  let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignMemLhsObj_2 = $(a);
    tmpAssignComMemLhsObj_1 = tmpAssignMemLhsObj_2;
    tmpAssignComMemLhsProp_1 = $('x');
    tmpAssignComputedObj_1 = tmpAssignComMemLhsObj_1;
    tmpAssignComputedProp_1 = tmpAssignComMemLhsProp_1;
    tmpAssignComputedRhs_1 = b + c;
    tmpAssignMemLhsObj_3 = tmpAssignComputedObj_1;
    tmpNestedPropAssignRhs = tmpAssignComputedRhs_1;
    tmpAssignMemLhsObj_3[tmpAssignComputedProp_1] = tmpNestedPropAssignRhs;
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
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
var tmpAssignMemLhsObj_2;
var tmpAssignComMemLhsObj_1;
var tmpAssignComMemLhsProp_1;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
var tmpAssignMemLhsObj_3;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = 8;
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj_2 = $(a);
  tmpAssignComMemLhsObj_1 = tmpAssignMemLhsObj_2;
  tmpAssignComMemLhsProp_1 = $('x');
  tmpAssignComputedObj_1 = tmpAssignComMemLhsObj_1;
  tmpAssignComputedProp_1 = tmpAssignComMemLhsProp_1;
  tmpAssignComputedRhs_1 = 8;
  tmpAssignMemLhsObj_3 = tmpAssignComputedObj_1;
  tmpNestedPropAssignRhs = tmpAssignComputedRhs_1;
  tmpAssignMemLhsObj_3[tmpAssignComputedProp_1] = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "x"
 - 2: {"x":5}
 - 3: "x"
 - 4: 5
 - 5: {"x":5},2,3
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 8 }], ['x'], [{ x: 8 }], ['x'], [8], [{ x: 8 }, 8, 3], null];

