# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > param-default > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
function f(foo = (a, b).c = (a, b).c = d) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignMemLhsObj;
  var tmpAssignMemLhsObj$1;
  var tmpAssignMemLhsObj$2;
  var tmpAssignMemRhs;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  var tmpNestedPropAssignRhs$1;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      a;
      tmpAssignMemLhsObj = b;
      tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
      a;
      tmpNestedAssignObj = b;
      tmpNestedPropAssignRhs = d;
      tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
      tmpAssignMemRhs = tmpNestedPropAssignRhs;
      tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
      tmpNestedPropAssignRhs$1 = tmpAssignMemRhs;
      tmpAssignMemLhsObj$2.c = tmpNestedPropAssignRhs$1;
      foo = tmpNestedPropAssignRhs$1;
    } else {
      foo = $tdz$__foo;
    }
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
  var tmpAssignMemLhsObj;
  var tmpAssignMemLhsObj$1;
  var tmpAssignMemLhsObj$2;
  var tmpAssignMemRhs;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  var tmpNestedPropAssignRhs$1;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = b;
    tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    tmpNestedAssignObj = b;
    tmpNestedPropAssignRhs = 3;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
    tmpNestedPropAssignRhs$1 = tmpAssignMemRhs;
    tmpAssignMemLhsObj$2.c = tmpNestedPropAssignRhs$1;
    foo = tmpNestedPropAssignRhs$1;
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
 - 0: 3
 - 1: 1,{"c":3},"unused",3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
