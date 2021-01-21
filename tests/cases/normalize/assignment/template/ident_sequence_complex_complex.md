# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$(`abc ${a = ($(b), $(c)).x = $(c)} def`);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
tmpArg = `abc ${
  ($(b),
  (tmpNestedAssignMemberObj = $(c)),
  (tmpNestedAssignMemberRhs = $(c)),
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
tmpArg = `abc ${
  ($(2),
  (tmpNestedAssignMemberObj = $(3)),
  (tmpNestedAssignMemberRhs = $(3)),
  (tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs),
  (a = tmpNestedAssignMemberRhs))
} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 3
 - 3: "abc 3 def"
 - 4: 3,2,3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
