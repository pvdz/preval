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
  var tmpNestedComplexRhs;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    $(b);
    tmpNestedAssignObj = $(c);
    tmpNestedPropAssignRhs = c;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    tmpNestedComplexRhs = tmpNestedPropAssignRhs;
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
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignObj;
  var tmpNestedComplexRhs;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    $(2);
    tmpNestedAssignObj = $(3);
    tmpNestedPropAssignRhs = 3;
    tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
    tmpNestedComplexRhs = tmpNestedPropAssignRhs;
    a = tmpNestedComplexRhs;
    foo = tmpNestedComplexRhs;
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
