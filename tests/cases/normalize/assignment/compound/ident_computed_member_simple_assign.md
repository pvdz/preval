# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > stmt > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= b[$('x')] -= $(c)[$('y')] = $(d);
$(a, b, c);
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
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignCompMemberObj = b;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberObj_1 = $(c);
tmpNestedAssignCompMemberProp_1 = $('y');
tmpNestedAssignCompMemberRhs_1 = $(d);
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
{
  tmpAssignComputedObj = tmpNestedAssignCompMemberObj;
  tmpAssignComputedProp = tmpNestedAssignCompMemberProp;
  tmpBinaryLeft = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
  tmpAssignComputedRhs = tmpBinaryLeft - tmpNestedAssignCompMemberRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, c);
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
let a = 1;
let b = { x: 2 };
tmpNestedAssignCompMemberObj = b;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberObj_1 = $(3);
tmpNestedAssignCompMemberProp_1 = $('y');
tmpNestedAssignCompMemberRhs_1 = $(4);
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpAssignComputedObj = tmpNestedAssignCompMemberObj;
tmpAssignComputedProp = tmpNestedAssignCompMemberProp;
tmpBinaryLeft = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
tmpAssignComputedRhs = tmpBinaryLeft - tmpNestedAssignCompMemberRhs;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: -2,{"x":-2},3
 - 5: undefined

Normalized calls: BAD?!
[['x'], [3], ['y'], [4], [4, { x: -2 }, 3], null];

Final output calls: BAD!!
[['x'], [3], ['y'], [4], [4, { x: -2 }, 3], null];

