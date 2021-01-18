# Preval test case

# member_simple_bin.md

> normalize > assignment > computed-prop > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let obj = {};
obj[a.x = b + c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignedComputedProp = tmpNestedAssignMemberRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let obj = {};
tmpAssignedComputedObj = obj;
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignedComputedProp = tmpNestedAssignMemberRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[{ x: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }, 5, 3], null];

