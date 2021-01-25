# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > param-default > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
function f(foo = $(a)[$('x')] = b) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberProp;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(a);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedPropAssignRhs = b;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    foo = tmpNestedPropAssignRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
('<hoisted func decl `f`>');
let a = { x: 10 };
let b = 2;
let c = 3;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignComMemberObj;
  var tmpNestedAssignComMemberProp;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(a);
    tmpNestedAssignComMemberObj = tmpNestedAssignObj;
    tmpNestedAssignComMemberProp = $('x');
    tmpNestedPropAssignRhs = 2;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    foo = tmpNestedPropAssignRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = { x: 10 };
tmpArg = f();
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: 2
 - 3: {"x":2},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
