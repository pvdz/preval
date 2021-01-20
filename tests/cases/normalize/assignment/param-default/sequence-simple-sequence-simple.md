# Preval test case

# sequence-simple-sequence-simple.md

> normalize > assignment > param-default > sequence-simple-sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
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
  var tmpAssignMemRhs;
  var tmpNestedAssignObj;
  var tmpNestedAssignObj_1;
  {
    let foo;
    {
      let ifTestTmp = $tdz$__foo === undefined;
      if (ifTestTmp) {
        a;
        tmpAssignMemLhsObj = b;
        a;
        tmpNestedAssignObj = b;
        tmpNestedAssignObj.c = d;
        tmpAssignMemRhs = d;
        tmpNestedAssignObj_1 = tmpAssignMemLhsObj;
        tmpNestedAssignObj_1.c = tmpAssignMemRhs;
        foo = tmpAssignMemRhs;
      } else {
        foo = $tdz$__foo;
      }
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
  var tmpNestedAssignObj_1;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = b;
    tmpNestedAssignObj = b;
    tmpNestedAssignObj.c = 3;
    tmpAssignMemRhs = 3;
    tmpNestedAssignObj_1 = tmpAssignMemLhsObj;
    tmpNestedAssignObj_1.c = tmpAssignMemRhs;
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
[[3], '<crash[ <ref> is not defined ]>'];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: Same
