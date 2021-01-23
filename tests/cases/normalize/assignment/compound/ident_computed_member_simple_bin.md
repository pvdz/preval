# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > stmt > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= b[$('x')] *= c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpBinaryRight = c + d;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft * tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpBinaryRight = 7;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft * tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 14,{"x":14},3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [14, { x: 14 }, 7], null];

