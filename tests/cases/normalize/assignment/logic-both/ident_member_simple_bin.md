# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > logic-both > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$((a = b.x = c + d) && (a = b.x = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
{
  tmpNestedAssignMemberObj = b;
  tmpNestedAssignMemberRhs = c + d;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignMemberObj$1 = b;
    tmpNestedAssignMemberRhs$1 = c + d;
    tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
    a = tmpNestedAssignMemberRhs$1;
    tmpArg = tmpNestedAssignMemberRhs$1;
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignMemberObj = b;
tmpNestedAssignMemberRhs = 11;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
a = tmpNestedAssignMemberRhs;
let tmpAssignLogicStmtOr = tmpNestedAssignMemberRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignMemberObj$1 = b;
  tmpNestedAssignMemberRhs$1 = 11;
  tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
  a = tmpNestedAssignMemberRhs$1;
  tmpArg = tmpNestedAssignMemberRhs$1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 11);
`````

## Result

Should call `$` with:
 - 0: 7
 - 1: 7,{"x":7},3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[11], [11, { x: 11 }, 11], null];

