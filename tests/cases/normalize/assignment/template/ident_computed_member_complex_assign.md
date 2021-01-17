# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > template > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$(`abc ${a = $(b)[$('x')] = $(c)[$('y')] = $(d)} def`)
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpArg = `abc ${
  ((tmpNestedAssignCompMemberObj = $(b)),
  (tmpNestedAssignCompMemberProp = $('x')),
  (tmpNestedAssignCompMemberObj_1 = $(c)),
  (tmpNestedAssignCompMemberProp_1 = $('y')),
  (tmpNestedAssignCompMemberRhs_1 = $(d)),
  (tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1),
  (tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1),
  (tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
  (a = tmpNestedAssignCompMemberRhs))
} def`;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
let a = 1;
let b = { x: 2 };
tmpArg = `abc ${
  ((tmpNestedAssignCompMemberObj = $(b)),
  (tmpNestedAssignCompMemberProp = $('x')),
  (tmpNestedAssignCompMemberObj_1 = $(3)),
  (tmpNestedAssignCompMemberProp_1 = $('y')),
  (tmpNestedAssignCompMemberRhs_1 = $(4)),
  (tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1),
  (tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1),
  (tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
  (a = tmpNestedAssignCompMemberRhs))
} def`;
$(tmpArg);
$(a, b, 3, 4);
`````
