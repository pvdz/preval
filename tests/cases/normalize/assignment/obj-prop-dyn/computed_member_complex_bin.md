# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > obj-prop-dyn > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({[($(a)[$('x')] = b + c)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignCompMemberObj = $(a);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = b + c;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpComputedKey = tmpNestedAssignCompMemberRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
tmpNestedAssignCompMemberObj = $(a);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = 5;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpComputedKey = tmpNestedAssignCompMemberRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
