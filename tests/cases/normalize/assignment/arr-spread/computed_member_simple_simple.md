# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > arr-spread > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$([...(a[$('x')] = b)]);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = b;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpElement = tmpNestedPropAssignRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 2;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpElement = tmpNestedPropAssignRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
