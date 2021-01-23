# Preval test case

# ident_computed_member_complex_simple.md

> normalize > assignment > logic-both > ident_computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$((a = $(b)[$('x')] = c) && (a = $(b)[$('x')] = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedPropAssignRhs$1;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  tmpNestedAssignObj = $(b);
  tmpNestedAssignComMemberObj = tmpNestedAssignObj;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedPropAssignRhs = c;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignObj$1 = $(b);
    tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
    tmpNestedAssignComMemberProp$1 = $('x');
    tmpNestedPropAssignRhs$1 = c;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
    tmpArg = tmpNestedPropAssignRhs$1;
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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedPropAssignRhs$1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpAssignLogicStmtOr = tmpNestedPropAssignRhs;
if (tmpAssignLogicStmtOr) {
  tmpNestedAssignObj$1 = $(b);
  tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
  tmpNestedAssignComMemberProp$1 = $('x');
  tmpNestedPropAssignRhs$1 = 3;
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
  a = tmpNestedPropAssignRhs$1;
  tmpArg = tmpNestedPropAssignRhs$1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: "x"
 - 2: {"x":3}
 - 3: "x"
 - 4: 3
 - 5: 3,{"x":3},3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
