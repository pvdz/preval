# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > tagged > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$`abc ${$(a)[$('x')] = b} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = b;
tmpArg_1 = b;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 2;
tmpArg_1 = 2;
$(tmpArg, tmpArg_1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
