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
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  {
    tmpAssignComputedObj = $(a);
    tmpAssignComputedProp = $('x');
    tmpAssignComputedRhs = b + c;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  }
  let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignComputedObj_1 = $(a);
    tmpAssignComputedProp_1 = $('x');
    tmpAssignComputedRhs_1 = b + c;
    tmpNestedAssignObj = tmpAssignComputedObj_1;
    tmpNestedAssignObj[tmpAssignComputedProp_1] = tmpAssignComputedRhs_1;
    tmpArg = tmpAssignComputedRhs_1;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
let a = { x: 10 };
tmpAssignComputedObj = $(a);
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = 8;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignComputedObj_1 = $(a);
  tmpAssignComputedProp_1 = $('x');
  tmpAssignComputedRhs_1 = 8;
  tmpNestedAssignObj = tmpAssignComputedObj_1;
  tmpNestedAssignObj[tmpAssignComputedProp_1] = tmpAssignComputedRhs_1;
  tmpArg = tmpAssignComputedRhs_1;
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

