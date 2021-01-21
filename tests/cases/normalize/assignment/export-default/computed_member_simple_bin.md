# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > export-default > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
export default a[$('x')] = b + c;
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
let a = { x: 10 };
let b = 2;
let c = 3;
export default ((tmpAssignComMemLhsObj = a),
(tmpAssignComMemLhsProp = $('x')),
(tmpAssignComputedObj = tmpAssignComMemLhsObj),
(tmpAssignComputedProp = tmpAssignComMemLhsProp),
(tmpAssignComputedRhs = b + c),
(tmpAssignMemLhsObj = tmpAssignComputedObj),
(tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs));
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
let a = { x: 10 };
export default ((tmpAssignComMemLhsObj = a),
(tmpAssignComMemLhsProp = $('x')),
(tmpAssignComputedObj = tmpAssignComMemLhsObj),
(tmpAssignComputedProp = tmpAssignComMemLhsProp),
(tmpAssignComputedRhs = 5),
(tmpAssignMemLhsObj = tmpAssignComputedObj),
(tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs));
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
