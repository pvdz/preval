# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > logic-right > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(true) || ($(a)[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpAssignMemLhsObj = $(a);
    tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
    tmpAssignComMemLhsProp = $('x');
    tmpNestedPropAssignRhs = b;
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpNestedPropAssignRhs;
    tmpArg = tmpNestedPropAssignRhs;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpAssignMemLhsObj = $(a);
  tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
  tmpAssignComMemLhsProp = $('x');
  tmpNestedPropAssignRhs = 2;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpNestedPropAssignRhs;
  tmpArg = tmpNestedPropAssignRhs;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: true
 - 2: {"x":10},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
