# Preval test case

# ident_ident_assign.md

> normalize > assignment > param-default > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
function f(foo = a = b = $(c).y = $(d)) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignObj;
  var tmpNestedComplexRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(c);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs = $(d);
    tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
    foo = tmpNestedComplexRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
('<hoisted func decl `f`>');
let a = 1;
let b = 2;
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
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignObj;
  var tmpNestedComplexRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = $(3);
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignMemberRhs = $(4);
    tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
    tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
    foo = tmpNestedComplexRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = 2;
tmpArg = f();
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 4
 - 3: 4,4,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
