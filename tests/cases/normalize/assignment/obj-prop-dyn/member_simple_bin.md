# Preval test case

# member_simple_bin.md

> normalize > assignment > obj-prop-dyn > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({[(a.x = b + c)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpComputedKey = tmpNestedAssignMemberRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpComputedKey = tmpNestedAssignMemberRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"5":1000}
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ 5: 1000 }], [{ x: 5 }, 5, 3], null];
