# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > param-default > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
function f(foo = (a, $(b)).c = (a, $(b)).c = d) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpAssignMemLhsObj;
  var tmpAssignMemLhsObj_1;
  var tmpAssignMemRhs;
  var tmpAssignMemLhsObj_2;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  var tmpNestedPropAssignRhs_1;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      a;
      tmpAssignMemLhsObj = $(b);
      tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
      a;
      tmpNestedAssignObj = $(b);
      tmpNestedPropAssignRhs = d;
      tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
      tmpAssignMemRhs = tmpNestedPropAssignRhs;
      tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
      tmpNestedPropAssignRhs_1 = tmpAssignMemRhs;
      tmpAssignMemLhsObj_2.c = tmpNestedPropAssignRhs_1;
      foo = tmpNestedPropAssignRhs_1;
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
  var tmpAssignMemLhsObj_1;
  var tmpAssignMemRhs;
  var tmpAssignMemLhsObj_2;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  var tmpNestedPropAssignRhs_1;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = $(b);
    tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
    tmpNestedAssignObj = $(b);
    tmpNestedPropAssignRhs = 3;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpAssignMemRhs = tmpNestedPropAssignRhs;
    tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
    tmpNestedPropAssignRhs_1 = tmpAssignMemRhs;
    tmpAssignMemLhsObj_2.c = tmpNestedPropAssignRhs_1;
    foo = tmpNestedPropAssignRhs_1;
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
 - 1: {"c":3}
 - 2: 3
 - 3: 1,{"c":3},"unused",3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
