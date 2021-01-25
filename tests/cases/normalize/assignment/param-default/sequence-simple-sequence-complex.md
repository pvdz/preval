# Preval test case

# sequence-simple-sequence-complex.md

> normalize > assignment > param-default > sequence-simple-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
function f(foo = (a, b).c = (a, $(b)).c = d) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignObj;
  var tmpNestedAssignObj$1;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    a;
    tmpNestedAssignObj = b;
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    a;
    tmpNestedAssignObj$1 = $(b);
    tmpNestedPropAssignRhs = d;
    tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
    tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
    tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
    foo = tmpNestedAssignMemberRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
('<hoisted func decl `f`>');
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignMemberObj;
  var tmpNestedAssignMemberRhs;
  var tmpNestedAssignObj;
  var tmpNestedAssignObj$1;
  var tmpNestedPropAssignRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedAssignObj = b;
    tmpNestedAssignMemberObj = tmpNestedAssignObj;
    tmpNestedAssignObj$1 = $(b);
    tmpNestedPropAssignRhs = 3;
    tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs;
    tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
    tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
    foo = tmpNestedAssignMemberRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let b = { c: 2 };
tmpArg = f();
$(tmpArg);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: 3
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
