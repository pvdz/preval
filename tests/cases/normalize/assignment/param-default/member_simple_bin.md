# Preval test case

# member_simple_bin.md

> normalize > assignment > param-default > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
function f(foo = a.x = b + c) {
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
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignMemberObj = a;
    tmpNestedAssignMemberRhs = b + c;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    foo = tmpNestedAssignMemberRhs;
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
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignMemberObj = a;
    tmpNestedAssignMemberRhs = 5;
    tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
    foo = tmpNestedAssignMemberRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = { x: 10 };
tmpArg = f();
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 5
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[5], [{ x: 5 }, 5, 3], null];

