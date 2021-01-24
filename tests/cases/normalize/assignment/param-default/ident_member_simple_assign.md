# Preval test case

# ident_member_simple_assign.md

> normalize > assignment > param-default > ident_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
function f(foo = a = b.x = $(c).y = $(d)) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberObj$1;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberRhs$1;
  var tmpNestedAssignObj;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpNestedAssignMemberObj = b;
      tmpNestedAssignObj = $(c);
      tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
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
('<hoisted func decl `f`>');
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberObj$1;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignMemberRhs$1;
  var tmpNestedAssignObj;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpNestedAssignMemberObj = b;
    tmpNestedAssignObj = $(3);
    tmpNestedAssignMemberObj$1 = tmpNestedAssignObj;
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
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 4
 - 3: 4,{"x":4},3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
