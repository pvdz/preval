# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > let > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let wat = $(a)[$('x')] = b + c;
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let b = 2;
let c = 3;
let tmpBindInitMemberObject = $(a);
let tmpBindInitRhs = b + c;
tmpAssignedComputedObj = tmpBindInitMemberObject;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpBindInitRhs;
let wat = tmpBindInitRhs;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let tmpBindInitMemberObject = $(a);
tmpAssignedComputedObj = tmpBindInitMemberObject;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = 5;
$(5);
$(a, 5, 3);
`````
