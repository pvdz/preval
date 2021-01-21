# Preval test case

# member_complex_bin.md

> normalize > assignment > computed-prop > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let obj = {};
obj[$(a).x = b + c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
let obj = {};
tmpAssignComMemLhsObj = obj;
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsProp = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let obj = {};
tmpAssignComMemLhsObj = obj;
tmpNestedAssignObj = $(a);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsProp = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], [{ x: 5 }, 5, 3], null];

