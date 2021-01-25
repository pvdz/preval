# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > param-default > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
function f(foo = a = $(b).x = c) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(b);
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    foo = tmpNestedPropAssignRhs;
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
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(b);
    tmpNestedPropAssignRhs = 3;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    foo = tmpNestedPropAssignRhs;
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
 - 0: {"x":3}
 - 1: 3
 - 2: 3,{"x":3},3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
