# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > param-default > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
function f(foo = a[$('x')] = b + c) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignComputedObj;
  var tmpAssignComputedProp;
  var tmpAssignComputedRhs;
  var tmpNestedAssignObj;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpAssignComputedObj = a;
      tmpAssignComputedProp = $('x');
      tmpAssignComputedRhs = b + c;
      tmpNestedAssignObj = tmpAssignComputedObj;
      tmpNestedAssignObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      foo = tmpAssignComputedRhs;
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
  var tmpAssignComputedObj;
  var tmpAssignComputedProp;
  var tmpAssignComputedRhs;
  var tmpNestedAssignObj;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignComputedObj = a;
    tmpAssignComputedProp = $('x');
    tmpAssignComputedRhs = 5;
    tmpNestedAssignObj = tmpAssignComputedObj;
    tmpNestedAssignObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    foo = tmpAssignComputedRhs;
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
[['x'], [5], [{ x: 10, undefined: 5 }, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[['x'], [5], [{ x: 10, undefined: 5 }, 5, 3], null];

