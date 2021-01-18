# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > obj-prop-init > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$({foo: a = b[$('x')] = c});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpObjPropValue = tmpNestedComplexRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpObjPropValue = tmpNestedComplexRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
[['x'], [{ foo: 3 }], [3, { x: 2, undefined: 3 }, 3], null];

Normalized calls: Same

Final output calls: Same
