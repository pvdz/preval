# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > obj-spread > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$({...(a = b[$('x')] = c + d)});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = c + d;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpObjSpreadArg = tmpNestedComplexRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = 7;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpObjSpreadArg = tmpNestedComplexRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {}
 - 2: 7,{"x":7},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [{}], [7, { x: 7 }, 7], null];

