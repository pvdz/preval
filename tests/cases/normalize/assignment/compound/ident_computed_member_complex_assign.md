# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= $(b)[$('x')] += $(c)[$('y')] -= $(d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpBinaryLeft;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
var tmpBinaryLeft_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignCompMemberObj = $(b);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberObj_1 = $(c);
tmpNestedAssignCompMemberProp_1 = $('y');
tmpNestedAssignCompMemberRhs_1 = $(d);
{
  tmpAssignComputedObj = tmpNestedAssignCompMemberObj_1;
  tmpAssignComputedProp = tmpNestedAssignCompMemberProp_1;
  tmpBinaryLeft = tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1];
  tmpAssignComputedRhs = tmpBinaryLeft - tmpNestedAssignCompMemberRhs_1;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
{
  tmpAssignComputedObj_1 = tmpNestedAssignCompMemberObj;
  tmpAssignComputedProp_1 = tmpNestedAssignCompMemberProp;
  tmpBinaryLeft_1 = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
  tmpAssignComputedRhs_1 = tmpBinaryLeft_1 + tmpNestedAssignCompMemberRhs;
  tmpAssignComputedObj_1[tmpAssignComputedProp_1] = tmpAssignComputedRhs_1;
}
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpBinaryLeft;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
var tmpBinaryLeft_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignCompMemberObj = $(b);
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberObj_1 = $(3);
tmpNestedAssignCompMemberProp_1 = $('y');
tmpNestedAssignCompMemberRhs_1 = $(4);
tmpAssignComputedObj = tmpNestedAssignCompMemberObj_1;
tmpAssignComputedProp = tmpNestedAssignCompMemberProp_1;
tmpBinaryLeft = tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1];
tmpAssignComputedRhs = tmpBinaryLeft - tmpNestedAssignCompMemberRhs_1;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpAssignComputedObj_1 = tmpNestedAssignCompMemberObj;
tmpAssignComputedProp_1 = tmpNestedAssignCompMemberProp;
tmpBinaryLeft_1 = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
tmpAssignComputedRhs_1 = tmpBinaryLeft_1 + tmpNestedAssignCompMemberRhs;
tmpAssignComputedObj_1[tmpAssignComputedProp_1] = tmpAssignComputedRhs_1;
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":null}
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: null,{"x":null},3,4
 - 6: undefined

Normalized calls: BAD?!
[[{ x: 6 }], ['x'], [3], ['y'], [4], [4, { x: 6 }, 3, 4], null];

Final output calls: BAD!!
[[{ x: 6 }], ['x'], [3], ['y'], [4], [4, { x: 6 }, 3, 4], null];

