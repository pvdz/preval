# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > tagged > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$`abc ${a = $(b)[$('x')] = c + d} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpArg = ['abc ', ' def'];
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = c + d;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpArg$1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg$1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignCompMemberRhs = 7;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpNestedComplexRhs = tmpNestedAssignCompMemberRhs;
a = tmpNestedComplexRhs;
tmpArg$1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg$1);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: "x"
 - 2: ["abc "," def"],7
 - 3: 7,{"x":7},3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 7 }], ['x'], [['abc ', ' def'], 7], [7, { x: 7 }, 7], null];

