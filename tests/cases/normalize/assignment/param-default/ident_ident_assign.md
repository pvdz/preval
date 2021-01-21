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
  var tmpNestedComplexRhs;
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpNestedAssignMemberObj = $(c);
      tmpNestedAssignMemberRhs = $(d);
      tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
      tmpNestedComplexRhs = tmpNestedAssignMemberRhs;
      b = tmpNestedComplexRhs;
      a = tmpNestedComplexRhs;
      foo = tmpNestedComplexRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpArg = f();
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedComplexRhs;
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpNestedAssignMemberObj = $(3);
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
