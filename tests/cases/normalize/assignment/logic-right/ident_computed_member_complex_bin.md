# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > logic-right > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
$($(true) || (a = $(b)[$('x')] = c + d));
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
{
  let tmpAssignLogicStmtOr = $(true);
  if (tmpAssignLogicStmtOr) {
    tmpArg = tmpAssignLogicStmtOr;
  } else {
    tmpNestedAssignCompMemberObj = $(b);
    tmpNestedAssignCompMemberProp = $('x');
    tmpNestedAssignCompMemberRhs = c + d;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
    tmpArg = tmpNestedAssignCompMemberRhs;
  }
}
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
let tmpAssignLogicStmtOr = $(true);
if (tmpAssignLogicStmtOr) {
  tmpArg = tmpAssignLogicStmtOr;
} else {
  tmpNestedAssignCompMemberObj = $(b);
  tmpNestedAssignCompMemberProp = $('x');
  tmpNestedAssignCompMemberRhs = 7;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  a = tmpNestedAssignCompMemberRhs;
  tmpArg = tmpNestedAssignCompMemberRhs;
}
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: true
 - 2: 1,{"x":2},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [true], [1, { x: 2 }, 7], null];

