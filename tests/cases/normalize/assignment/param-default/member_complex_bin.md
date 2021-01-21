# Preval test case

# member_complex_bin.md

> normalize > assignment > param-default > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
function f(foo = $(a).x = b + c) {
  return foo;
}
$(f());
$(a, b, c);
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
      tmpAssignMemLhsObj = $(a);
      tmpAssignMemRhs = b + c;
      tmpNestedAssignObj = tmpAssignMemLhsObj;
      tmpNestedAssignObj.x = tmpAssignMemRhs;
      foo = tmpAssignMemRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = f();
$(tmpArg);
$(a, b, c);
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
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemRhs = 5;
    tmpNestedAssignObj = tmpAssignMemLhsObj;
    tmpNestedAssignObj.x = tmpAssignMemRhs;
    foo = tmpAssignMemRhs;
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
 - 0: {"x":5}
 - 1: 5
 - 2: {"x":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], [5], [{ x: 5 }, 5, 3], null];

