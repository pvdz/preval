# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > template > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$(`abc ${a = $(b)[$('x')] = c} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpArg = `abc ${
  ((tmpNestedAssignObj = $(b)),
  (tmpNestedAssignComMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignComMemberProp = $('x')),
  (tmpNestedPropAssignRhs = c),
  (tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs),
  (a = tmpNestedPropAssignRhs))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
tmpArg = `abc ${
  ((tmpNestedAssignObj = $(b)),
  (tmpNestedAssignComMemberObj = tmpNestedAssignObj),
  (tmpNestedAssignComMemberProp = $('x')),
  (tmpNestedPropAssignRhs = 3),
  (tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs),
  (a = tmpNestedPropAssignRhs))
} def`;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: "x"
 - 2: "abc 3 def"
 - 3: 3,{"x":3},3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
