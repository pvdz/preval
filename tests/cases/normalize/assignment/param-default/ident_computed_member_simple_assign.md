# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > param-default > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
function f(foo = a = b[$('x')] = $(c)[$('y')] = $(d)) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberRhs;
  var tmpNestedAssignCompMemberObj_1;
  var tmpNestedAssignCompMemberProp_1;
  var tmpNestedAssignCompMemberRhs_1;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpNestedAssignCompMemberObj = b;
      tmpNestedAssignCompMemberProp = $('x');
      tmpNestedAssignCompMemberObj_1 = $(c);
      tmpNestedAssignCompMemberProp_1 = $('y');
      tmpNestedAssignCompMemberRhs_1 = $(d);
      tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
      tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
      a = tmpNestedAssignCompMemberRhs;
      foo = tmpNestedAssignCompMemberRhs;
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
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberRhs;
  var tmpNestedAssignCompMemberObj_1;
  var tmpNestedAssignCompMemberProp_1;
  var tmpNestedAssignCompMemberRhs_1;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpNestedAssignCompMemberObj = b;
    tmpNestedAssignCompMemberProp = $('x');
    tmpNestedAssignCompMemberObj_1 = $(3);
    tmpNestedAssignCompMemberProp_1 = $('y');
    tmpNestedAssignCompMemberRhs_1 = $(4);
    tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
    tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
    foo = tmpNestedAssignCompMemberRhs;
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
[['x'], [3], ['y'], [4], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
