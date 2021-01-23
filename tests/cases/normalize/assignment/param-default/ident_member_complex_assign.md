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
  var tmpNestedAssignMemberObj$1;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberRhs$1;
  var tmpNestedAssignObj;
  var tmpNestedAssignObj$1;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpNestedAssignObj = $(b);
      tmpNestedAssignMemberObj = tmpNestedAssignObj;
      tmpNestedAssignObj$1 = $(c);
      tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
      tmpNestedAssignMemberRhs$1 = $(d);
      tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
      tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
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
('<hoisted var `tmpArg` decl without init>');
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberObj$1;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberRhs$1;
  var tmpNestedAssignObj;
  var tmpNestedAssignObj$1;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignObj$1 = $(3);
    tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
    tmpNestedAssignMemberRhs$1 = $(4);
    tmpNestedAssignMemberObj$1.y = tmpNestedAssignMemberRhs$1;
    tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
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
 - 0: {"x":4}
 - 1: 3
 - 2: 4
 - 3: 4
 - 4: 4,{"x":4},3,4
 - 5: undefined

Normalized calls: Same

Final output calls: Same
