# Preval test case

# ident_member_complex_assign.md

> normalize > assignment > param-default > ident_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
function f(foo = a = $(b).x = $(c).y = $(d)) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberObj_1;
  var tmpNestedAssignMemberRhs_1;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpNestedAssignMemberObj = $(b);
      tmpNestedAssignMemberObj_1 = $(c);
      tmpNestedAssignMemberRhs_1 = $(d);
      tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
      tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
      a = tmpNestedAssignMemberRhs;
      foo = tmpNestedAssignMemberRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpArg = f();
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberObj_1;
  var tmpNestedAssignMemberRhs_1;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpNestedAssignMemberObj = $(b);
    tmpNestedAssignMemberObj_1 = $(3);
    tmpNestedAssignMemberRhs_1 = $(4);
    tmpNestedAssignMemberObj_1.y = tmpNestedAssignMemberRhs_1;
    tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    a = tmpNestedAssignMemberRhs;
    foo = tmpNestedAssignMemberRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = { x: 2 };
tmpArg = f();
$(tmpArg);
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: 3
 - 2: 4
 - 3: <crash[ Cannot set property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
