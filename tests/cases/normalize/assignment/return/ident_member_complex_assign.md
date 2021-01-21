# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > return > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
(function(){ return a = $(b).x = $(c).y = $(d); })();
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNewObj = function () {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberObj_1;
  var tmpNestedAssignMemberRhs_1;
  {
    tmpNestedAssignMemberObj = $(b);
    tmpNestedAssignMemberObj_1 = $(c);
    tmpNestedAssignMemberRhs_1 = $(d);
    tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
    tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
    let tmpStmtArg = a;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { x: 2 };
tmpNewObj = function () {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberObj_1;
  var tmpNestedAssignMemberRhs_1;
  tmpNestedAssignMemberObj = $(b);
  tmpNestedAssignMemberObj_1 = $(3);
  tmpNestedAssignMemberRhs_1 = $(4);
  tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
  tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  a = tmpNestedAssignMemberRhs;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: 3
 - 2: 4
 - 3: 4,{"x":4},3,4
 - 4: undefined

Normalized calls: Same

Final output calls: Same
