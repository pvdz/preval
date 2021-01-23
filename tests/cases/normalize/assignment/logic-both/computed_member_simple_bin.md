# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > logic-both > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a[$('x')] = b + c) && (a[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj$1;
var tmpAssignComMemLhsProp$1;
var tmpAssignComputedObj$1;
var tmpAssignComputedProp$1;
var tmpAssignComputedRhs$1;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  tmpAssignComMemLhsObj = a;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComputedObj = tmpAssignComMemLhsObj;
  tmpAssignComputedProp = tmpAssignComMemLhsProp;
  tmpAssignComputedRhs = b + c;
  tmpAssignMemLhsObj = tmpAssignComputedObj;
  tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
  if (tmpAssignLogicStmtOr) {
    tmpAssignComMemLhsObj$1 = a;
    tmpAssignComMemLhsProp$1 = $('x');
    tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
    tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
    tmpAssignComputedRhs$1 = b + c;
    tmpAssignMemLhsObj$1 = tmpAssignComputedObj$1;
    tmpNestedPropAssignRhs = tmpAssignComputedRhs$1;
    tmpAssignMemLhsObj$1[tmpAssignComputedProp$1] = tmpNestedPropAssignRhs;
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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj$1;
var tmpAssignComMemLhsProp$1;
var tmpAssignComputedObj$1;
var tmpAssignComputedProp$1;
var tmpAssignComputedRhs$1;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
tmpAssignComMemLhsObj = a;
tmpAssignComMemLhsProp = $('x');
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = 8;
tmpAssignMemLhsObj = tmpAssignComputedObj;
tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
let tmpAssignLogicStmtOr = tmpAssignComputedRhs;
if (tmpAssignLogicStmtOr) {
  tmpAssignComMemLhsObj$1 = a;
  tmpAssignComMemLhsProp$1 = $('x');
  tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
  tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
  tmpAssignComputedRhs$1 = 8;
  tmpAssignMemLhsObj$1 = tmpAssignComputedObj$1;
  tmpNestedPropAssignRhs = tmpAssignComputedRhs$1;
  tmpAssignMemLhsObj$1[tmpAssignComputedProp$1] = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 8, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "x"
 - 2: 5
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], ['x'], [8], [{ x: 8 }, 8, 3], null];

