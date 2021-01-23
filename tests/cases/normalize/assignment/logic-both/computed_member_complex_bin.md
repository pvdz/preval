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
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsObj$1;
var tmpAssignComMemLhsProp;
var tmpAssignComMemLhsProp$1;
var tmpAssignComputedObj;
var tmpAssignComputedObj$1;
var tmpAssignComputedProp;
var tmpAssignComputedProp$1;
var tmpAssignComputedRhs;
var tmpAssignComputedRhs$1;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemLhsObj$3;
var tmpNestedPropAssignRhs;
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
  tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
  tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
  let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignMemLhsObj$2 = $(a);
    tmpAssignComMemLhsObj$1 = tmpAssignMemLhsObj$2;
    tmpAssignComMemLhsProp$1 = $('x');
    tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
    tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
    tmpAssignComputedRhs$1 = b + c;
    tmpAssignMemLhsObj$3 = tmpAssignComputedObj$1;
    tmpNestedPropAssignRhs = tmpAssignComputedRhs$1;
    tmpAssignMemLhsObj$3[tmpAssignComputedProp$1] = tmpNestedPropAssignRhs;
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
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsObj$1;
var tmpAssignComMemLhsProp;
var tmpAssignComMemLhsProp$1;
var tmpAssignComputedObj;
var tmpAssignComputedObj$1;
var tmpAssignComputedProp;
var tmpAssignComputedProp$1;
var tmpAssignComputedRhs;
var tmpAssignComputedRhs$1;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemLhsObj$3;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = 8;
tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignMemLhsObj$2 = $(a);
  tmpAssignComMemLhsObj$1 = tmpAssignMemLhsObj$2;
  tmpAssignComMemLhsProp$1 = $('x');
  tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
  tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
  tmpAssignComputedRhs$1 = 8;
  tmpAssignMemLhsObj$3 = tmpAssignComputedObj$1;
  tmpNestedPropAssignRhs = tmpAssignComputedRhs$1;
  tmpAssignMemLhsObj$3[tmpAssignComputedProp$1] = tmpNestedPropAssignRhs;
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

