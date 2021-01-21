# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > stmt > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(a)[$('x')] *= b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpCompoundAssignLhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
var tmpBinaryLeft;
var tmpBinaryRight;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpCompoundAssignLhs = tmpAssignComMemLhsObj[tmpAssignComMemLhsProp];
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = b + c;
tmpAssignComputedRhs = tmpBinaryLeft * tmpBinaryRight;
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpCompoundAssignLhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
var tmpBinaryLeft;
var tmpBinaryRight;
let a = { x: 10 };
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpCompoundAssignLhs = tmpAssignComMemLhsObj[tmpAssignComMemLhsProp];
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpBinaryRight = 5;
tmpAssignComputedRhs = tmpBinaryLeft * tmpBinaryRight;
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":50}
 - 1: "x"
 - 2: {"x":50},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 50 }], ['x'], [{ x: 50 }, 5, 3], null];

