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
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
export default ((tmpAssignComputedObj = a), (tmpAssignComputedProp = $('x')), (tmpAssignComputedRhs = b + c), tmpAssignComputedObj)[
  tmpAssignComputedProp
] = tmpAssignComputedRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
export default ((tmpAssignComputedObj = a), (tmpAssignComputedProp = $('x')), (tmpAssignComputedRhs = 5), tmpAssignComputedObj)[
  tmpAssignComputedProp
] = tmpAssignComputedRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
["<crash[ Unexpected token 'export' ]>"];

Normalized calls: Same

Final output calls: Same
