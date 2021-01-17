# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > template > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$(`abc ${a = b.x = c + d} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpArg = `abc ${
  ((tmpNestedAssignMemberObj = b),
  (tmpNestedAssignMemberRhs = c + d),
  (tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
  (a = tmpNestedAssignMemberRhs))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = { x: 2 };
tmpArg = `abc ${
  ((tmpNestedAssignMemberObj = b),
  (tmpNestedAssignMemberRhs = 7),
  (tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
  (a = tmpNestedAssignMemberRhs))
} def`;
$(tmpArg);
$(a, b, 7);
`````
