# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$($(true) || (a = ($(b), $(c)).x = $(c)));
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
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    $(b);
    tmpNestedAssignMemberObj = $(c);
    tmpNestedAssignMemberRhs = $(c);
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
    tmpArg = tmpNestedAssignMemberRhs;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  $(2);
  tmpNestedAssignMemberObj = $(3);
  tmpNestedAssignMemberRhs = $(3);
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  tmpArg = tmpNestedAssignMemberRhs;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: 2
 - 2: 3
 - 3: 3
 - 4: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
