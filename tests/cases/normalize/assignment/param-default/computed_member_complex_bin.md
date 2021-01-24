# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > param-default > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
function f(foo = $(a)[$('x')] = b + c) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignComMemLhsObj;
  var tmpAssignComMemLhsProp;
  var tmpAssignComputedObj;
  var tmpAssignComputedProp;
  var tmpAssignComputedRhs;
  var tmpAssignMemLhsObj;
  var tmpAssignMemLhsObj$1;
  var tmpNestedPropAssignRhs;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpAssignMemLhsObj = $(a);
      tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
      tmpAssignComMemLhsProp = $('x');
      tmpAssignComputedObj = tmpAssignComMemLhsObj;
      tmpAssignComputedProp = tmpAssignComMemLhsProp;
      tmpAssignComputedRhs = b + c;
      tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
      tmpNestedPropAssignRhs = tmpAssignComputedRhs;
      tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpNestedPropAssignRhs;
      foo = tmpNestedPropAssignRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
('<hoisted func decl `f`>');
let a = { x: 10 };
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
  var tmpAssignComMemLhsObj;
  var tmpAssignComMemLhsProp;
  var tmpAssignComputedObj;
  var tmpAssignComputedProp;
  var tmpAssignComputedRhs;
  var tmpAssignMemLhsObj;
  var tmpAssignMemLhsObj$1;
  var tmpNestedPropAssignRhs;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = $(a);
    tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
    tmpAssignComMemLhsProp = $('x');
    tmpAssignComputedObj = tmpAssignComMemLhsObj;
    tmpAssignComputedProp = tmpAssignComMemLhsProp;
    tmpAssignComputedRhs = 5;
    tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
    tmpNestedPropAssignRhs = tmpAssignComputedRhs;
    tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpNestedPropAssignRhs;
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
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: "x"
 - 2: 5
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], ['x'], [5], [{ x: 5 }, 5, 3], null];

