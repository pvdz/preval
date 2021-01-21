# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > arr-element > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$([ a = $(b)[$('x')] = c ]);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignComMemberObj = $(b);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [tmpElement];
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = $(b);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [tmpElement];
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: <crash[ Cannot set property 'undefined' of undefined ]>

Normalized calls: Same

Final output calls: Same
