# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > obj-prop-init > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$({foo: $(a)[$('x')] = b});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = b;
tmpObjPropValue = b;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = { x: 10 };
tmpNestedAssignComMemberObj = $(a);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 2;
tmpObjPropValue = 2;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same