# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > template > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$(`abc ${a = b[$('x')] = c + d} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpArg = `abc ${
  ((tmpNestedAssignCompMemberObj = b),
  (tmpNestedAssignCompMemberProp = $('x')),
  (tmpNestedAssignCompMemberRhs = c + d),
  (tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
  (a = tmpNestedAssignCompMemberRhs))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = 1;
let b = { x: 2 };
tmpArg = `abc ${
  ((tmpNestedAssignCompMemberObj = b),
  (tmpNestedAssignCompMemberProp = $('x')),
  (tmpNestedAssignCompMemberRhs = 7),
  (tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs),
  (a = tmpNestedAssignCompMemberRhs))
} def`;
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "abc 7 def"
 - 2: 7,{"x":7},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], ['abc 7 def'], [7, { x: 7 }, 7], null];

