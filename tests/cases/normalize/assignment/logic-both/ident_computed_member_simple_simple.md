# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > logic-both > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = b[$('x')] = c) && (a = b[$('x')] = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  tmpNestedAssignComMemberObj = b;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignComMemberObj_1 = b;
    tmpNestedAssignComMemberProp_1 = $('x');
    tmpNestedPropAssignRhs_1 = c;
    tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
    a = tmpNestedPropAssignRhs_1;
    tmpArg = tmpNestedPropAssignRhs_1;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedPropAssignRhs_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignComMemberObj_1 = b;
  tmpNestedAssignComMemberProp_1 = $('x');
  tmpNestedPropAssignRhs_1 = 3;
  tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = tmpNestedPropAssignRhs_1;
  a = tmpNestedPropAssignRhs_1;
  tmpArg = tmpNestedPropAssignRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: "x"
 - 2: 3
 - 3: 3,{"x":3},3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
