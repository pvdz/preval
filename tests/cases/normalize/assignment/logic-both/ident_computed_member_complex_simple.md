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
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  tmpNestedAssignComMemberObj = $(b);
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = c;
  a = c;
  let tmpAssignLogicStmtOr = c;
  if (tmpAssignLogicStmtOr) {
    tmpNestedAssignComMemberObj_1 = $(b);
    tmpNestedAssignComMemberProp_1 = $('x');
    tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = c;
    a = c;
    tmpArg = c;
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
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = $(b);
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
a = 3;
tmpNestedAssignComMemberObj_1 = $(b);
tmpNestedAssignComMemberProp_1 = $('x');
tmpNestedAssignComMemberObj_1[tmpNestedAssignComMemberProp_1] = 3;
a = 3;
tmpArg = 3;
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
