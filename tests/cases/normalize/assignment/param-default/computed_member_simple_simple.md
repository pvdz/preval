# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > param-default > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
function f(foo = a[$('x')] = b) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignedComputedObj;
  var tmpAssignedComputedProp;
  var tmpNestedPropAssignRhs;
  {
    let foo;
    {
      let ifTestTmp = $tdz$__foo === undefined;
      if (ifTestTmp) {
        tmpAssignedComputedObj = a;
        tmpAssignedComputedProp = $('x');
        tmpNestedPropAssignRhs = b;
        tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpNestedPropAssignRhs;
        foo = tmpNestedPropAssignRhs;
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
  var tmpAssignedComputedObj;
  var tmpAssignedComputedProp;
  var tmpNestedPropAssignRhs;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignedComputedObj = a;
    tmpAssignedComputedProp = $('x');
    tmpNestedPropAssignRhs = 2;
    tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpNestedPropAssignRhs;
    foo = tmpNestedPropAssignRhs;
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
[['x'], [2], [{ x: 10, undefined: 2 }, 2, 3], null];

Normalized calls: BAD?!
[['x'], '<crash[ <ref> is not defined ]>'];

Final output calls: Same
