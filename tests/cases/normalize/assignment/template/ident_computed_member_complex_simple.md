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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpArg = `abc ${
  ((tmpNestedAssignComMemberObj = $(b)),
  (tmpNestedAssignComMemberProp = $('x')),
  (tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c),
  (a = c))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
let a = 1;
let b = { x: 2 };
tmpArg = `abc ${
  ((tmpNestedAssignComMemberObj = $(b)),
  (tmpNestedAssignComMemberProp = $('x')),
  (tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3),
  (a = 3))
} def`;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[{ x: 2 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
