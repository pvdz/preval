# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > export-default > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b[$('x')] = $(c)[$('y')] = $(d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
let b = { x: 2 };
let c = 3;
let d = 4;
export let a =
  ((tmpAssignComMemLhsObj = b),
  (tmpAssignComMemLhsProp = $('x')),
  (((tmpAssignComputedObj = tmpAssignComMemLhsObj),
  (tmpAssignComputedProp = tmpAssignComMemLhsProp),
  ((tmpNestedAssignObj = $(c)),
  ((tmpNestedAssignComMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignComMemberProp = $('y')),
  ((tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj),
  (tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp),
  (tmpNestedAssignCompMemberRhs = $(d)),
  (tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
  (tmpAssignComputedRhs = tmpNestedAssignCompMemberRhs)))),
  (tmpAssignMemLhsObj = tmpAssignComputedObj)),
  (tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs)));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj;
let b = { x: 2 };
export let a =
  ((tmpAssignComMemLhsObj = b),
  (tmpAssignComMemLhsProp = $('x')),
  (((tmpAssignComputedObj = tmpAssignComMemLhsObj),
  (tmpAssignComputedProp = tmpAssignComMemLhsProp),
  ((tmpNestedAssignObj = $(3)),
  ((tmpNestedAssignComMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignComMemberProp = $('y')),
  ((tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj),
  (tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp),
  (tmpNestedAssignCompMemberRhs = $(4)),
  (tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
  (tmpAssignComputedRhs = tmpNestedAssignCompMemberRhs)))),
  (tmpAssignMemLhsObj = tmpAssignComputedObj)),
  (tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs)));
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
