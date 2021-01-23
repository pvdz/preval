# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > export-default > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
export default $(a)[$('x')] = b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
let b = 2;
let c = 3;
export default ((tmpAssignMemLhsObj = $(a)),
(tmpAssignComMemLhsObj = tmpAssignMemLhsObj),
(tmpAssignComMemLhsProp = $('x')),
(tmpAssignComputedObj = tmpAssignComMemLhsObj),
(tmpAssignComputedProp = tmpAssignComMemLhsProp),
(tmpAssignComputedRhs = b + c),
(tmpAssignMemLhsObj$1 = tmpAssignComputedObj),
(tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj$1;
let a = { x: 10 };
export default ((tmpAssignMemLhsObj = $(a)),
(tmpAssignComMemLhsObj = tmpAssignMemLhsObj),
(tmpAssignComMemLhsProp = $('x')),
(tmpAssignComputedObj = tmpAssignComMemLhsObj),
(tmpAssignComputedProp = tmpAssignComMemLhsProp),
(tmpAssignComputedRhs = 5),
(tmpAssignMemLhsObj$1 = tmpAssignComputedObj),
(tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs));
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
