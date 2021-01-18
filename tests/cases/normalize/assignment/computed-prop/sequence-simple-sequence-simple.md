# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > computed-prop > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
obj[(a, b).c = (a, b).c = d] = 1000;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpAssignedComputedObj = obj;
a;
tmpNestedAssignMemberObj = b;
a;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = d;
tmpNestedAssignMemberRhs = d;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpAssignedComputedProp = tmpNestedAssignMemberRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpAssignedComputedObj = obj;
tmpNestedAssignMemberObj = b;
tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 3;
tmpNestedAssignMemberRhs = 3;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpAssignedComputedProp = tmpNestedAssignMemberRhs;
tmpAssignedComputedObj[tmpAssignedComputedProp] = 1000;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
['<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
