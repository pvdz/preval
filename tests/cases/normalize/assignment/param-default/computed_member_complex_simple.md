# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > param-default > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
function f(foo = $(a)[$('x')] = b) {
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
  var tmpAssignedComputedObj;
  var tmpAssignedComputedProp;
  {
    let foo;
    {
      let ifTestTmp = $tdz$__foo === undefined;
      if (ifTestTmp) {
        tmpAssignMemLhsObj = $(a);
        tmpAssignMemRhs = b;
        tmpAssignedComputedObj = tmpAssignMemLhsObj;
        tmpAssignedComputedProp = $('x');
        tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
        foo = tmpAssignMemRhs;
      } else {
        foo = $tdz$__foo;
      }
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
  var tmpAssignedComputedObj;
  var tmpAssignedComputedProp;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemRhs = 2;
    tmpAssignedComputedObj = tmpAssignMemLhsObj;
    tmpAssignedComputedProp = $('x');
    tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
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
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
