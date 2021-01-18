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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
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
    tmpAssignMemLhsObj = a;
    tmpAssignMemRhs = b + c;
    tmpAssignedComputedObj = tmpAssignMemLhsObj;
    tmpAssignedComputedProp = $('x');
    tmpNestedPropAssignRhs = tmpAssignMemRhs;
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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = a;
  tmpAssignMemRhs = 5;
  tmpAssignedComputedObj = tmpAssignMemLhsObj;
  tmpAssignedComputedProp = $('x');
  tmpNestedPropAssignRhs = tmpAssignMemRhs;
  tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[true], ['x'], [5], [{ x: 10, undefined: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[true], ['x'], [5], [{ x: 10, undefined: 5 }, 5, 3], null];

