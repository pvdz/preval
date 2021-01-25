# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > param-default > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
function f(foo = a = $(b)[$('x')] = $(c)[$('y')] = $(d)) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberObj$1;
  var tmpNestedAssignComMemberProp;
  var tmpNestedAssignComMemberProp$1;
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberObj$1;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberProp$1;
  var tmpNestedAssignCompMemberRhs;
  var tmpNestedAssignCompMemberRhs$1;
  var tmpNestedAssignObj;
  var tmpNestedAssignObj$1;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
    tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
    tmpNestedAssignObj$1 = $(c);
    tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
    tmpNestedAssignComMemberProp$1 = $('y');
    tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
    tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
    tmpNestedAssignCompMemberRhs$1 = $(d);
    tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
    tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
    tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
    a = tmpNestedAssignCompMemberRhs;
    foo = tmpNestedAssignCompMemberRhs;
  } else {
    foo = $tdz$__foo;
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
$(a, b, c, d);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberObj$1;
  var tmpNestedAssignComMemberProp;
  var tmpNestedAssignComMemberProp$1;
  var tmpNestedAssignCompMemberObj;
  var tmpNestedAssignCompMemberObj$1;
  var tmpNestedAssignCompMemberProp;
  var tmpNestedAssignCompMemberProp$1;
  var tmpNestedAssignCompMemberRhs;
  var tmpNestedAssignCompMemberRhs$1;
  var tmpNestedAssignObj;
  var tmpNestedAssignObj$1;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
    tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
    tmpNestedAssignObj$1 = $(3);
    tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
    tmpNestedAssignComMemberProp$1 = $('y');
    tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
    tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
    tmpNestedAssignCompMemberRhs$1 = $(4);
    tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
    tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
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
$(a, b, 3, 4);
`````

## Result

Should call `$` with:
 - 0: {"x":4}
 - 1: "x"
 - 2: 3
 - 3: "y"
 - 4: 4
 - 5: 4
 - 6: 4,{"x":4},3,4
 - 7: undefined

Normalized calls: Same

Final output calls: Same
