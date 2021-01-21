# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
function f(foo = (a, $(b)).c = d) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignMemLhsObj;
  var tmpAssignMemRhs;
  var tmpNestedAssignObj;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      a;
      tmpAssignMemLhsObj = $(b);
      tmpAssignMemRhs = d;
      tmpNestedAssignObj = tmpAssignMemLhsObj;
      tmpNestedAssignObj.c = tmpAssignMemRhs;
      foo = tmpAssignMemRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpArg = f();
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignMemLhsObj;
  var tmpAssignMemRhs;
  var tmpNestedAssignObj;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = $(b);
    tmpAssignMemRhs = 3;
    tmpNestedAssignObj = tmpAssignMemLhsObj;
    tmpNestedAssignObj.c = tmpAssignMemRhs;
    foo = tmpAssignMemRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let b = { c: 2 };
tmpArg = f();
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
