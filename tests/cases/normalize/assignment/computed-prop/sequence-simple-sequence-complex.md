# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > computed-prop > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
obj[(a, b).c = (a, $(b)).c = d] = 1000;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpAssignComMemLhsObj = obj;
a;
tmpNestedAssignObj = b;
tmpNestedAssignMemberObj = tmpNestedAssignObj;
a;
tmpNestedAssignObj$1 = $(b);
tmpNestedPropAssignRhs = d;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsProp = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
tmpAssignComMemLhsObj = obj;
tmpNestedAssignObj = b;
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = $(b);
tmpNestedPropAssignRhs = 3;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsProp = tmpNestedAssignMemberRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
