# Preval test case

# sequence-simple.md

> normalize > assignment > param-default > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
function f(foo = (a, b).c = d) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignMemLhsObj;
  var tmpNestedPropAssignRhs;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      a;
      tmpAssignMemLhsObj = b;
      tmpNestedPropAssignRhs = d;
      tmpAssignMemLhsObj.c = tmpNestedPropAssignRhs;
      foo = tmpNestedPropAssignRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpArg = f();
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignMemLhsObj;
  var tmpNestedPropAssignRhs;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = b;
    tmpNestedPropAssignRhs = 3;
    tmpAssignMemLhsObj.c = tmpNestedPropAssignRhs;
    foo = tmpNestedPropAssignRhs;
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
