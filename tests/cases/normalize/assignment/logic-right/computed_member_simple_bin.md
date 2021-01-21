# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > logic-right > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || (a[$('x')] = b + c));
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
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpAssignComMemLhsObj = a;
    tmpAssignComMemLhsProp = $('x');
    tmpAssignComputedObj = tmpAssignComMemLhsObj;
    tmpAssignComputedProp = tmpAssignComMemLhsProp;
    tmpAssignComputedRhs = b + c;
    tmpAssignMemLhsObj = tmpAssignComputedObj;
    tmpNestedPropAssignRhs = tmpAssignComputedRhs;
    tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpNestedPropAssignRhs;
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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignComMemLhsObj = a;
  tmpAssignComMemLhsProp = $('x');
  tmpAssignComputedObj = tmpAssignComMemLhsObj;
  tmpAssignComputedProp = tmpAssignComMemLhsProp;
  tmpAssignComputedRhs = 5;
  tmpAssignMemLhsObj = tmpAssignComputedObj;
  tmpNestedPropAssignRhs = tmpAssignComputedRhs;
  tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: true
 - 2: {"x":10},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [true], [{ x: 10 }, 5, 3], null];

