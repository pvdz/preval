# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > stmt > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
a[$('x')] *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpCompoundAssignLhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignComMemLhsObj = a;
tmpAssignComMemLhsProp = $('x');
tmpCompoundAssignLhs = tmpAssignComMemLhsObj[tmpAssignComMemLhsProp];
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = tmpCompoundAssignLhs * b;
tmpAssignMemLhsObj = tmpAssignComputedObj;
tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpCompoundAssignLhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
let a = { x: 10 };
tmpAssignComMemLhsObj = a;
tmpAssignComMemLhsProp = $('x');
tmpCompoundAssignLhs = tmpAssignComMemLhsObj[tmpAssignComMemLhsProp];
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpAssignComputedRhs = tmpCompoundAssignLhs * 2;
tmpAssignMemLhsObj = tmpAssignComputedObj;
tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {"x":20},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
