# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
function f(foo = a = ($(b), $(c)).x = c) {
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
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      $(b);
      tmpNestedAssignObj = $(c);
      tmpNestedPropAssignRhs = c;
      tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
      foo = tmpNestedPropAssignRhs;
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
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    $(2);
    tmpNestedAssignObj = $(3);
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
tmpArg = f();
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 3
 - 3: 3,2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
