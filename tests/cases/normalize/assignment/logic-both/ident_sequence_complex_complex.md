# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), $(c)).x = $(c)) && (a = ($(b), $(c)).x = $(c)));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  tmpNestedAssignObj = $(c);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignMemberRhs = $(c);
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
  if (tmpAssignLogicStmtOr) {
    $(b);
    tmpNestedAssignObj_1 = $(c);
    tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
    tmpNestedAssignMemberRhs_1 = $(c);
    tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
    a = tmpNestedAssignMemberRhs_1;
    tmpArg = tmpNestedAssignMemberRhs_1;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
let a = 1;
$(2);
tmpNestedAssignObj = $(3);
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignMemberRhs = $(3);
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
if (tmpAssignLogicStmtOr) {
  $(2);
  tmpNestedAssignObj_1 = $(3);
  tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
  tmpNestedAssignMemberRhs_1 = $(3);
  tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
  a = tmpNestedAssignMemberRhs_1;
  tmpArg = tmpNestedAssignMemberRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 3
 - 3: 2
 - 4: 3
 - 5: 3
 - 6: 3
 - 7: 3,2,3
 - 8: undefined

Normalized calls: Same

Final output calls: Same
