# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > return > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
(function(){ return (a, $(b)).c = (a, $(b)).c = d; })();
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpNewObj = function () {
  var tmpAssignMemLhsObj;
  var tmpAssignMemLhsObj$1;
  var tmpAssignMemLhsObj$2;
  var tmpAssignMemRhs;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  a;
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemRhs = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
  let tmpReturnArg = tmpAssignMemRhs;
  return tmpReturnArg;
};
tmpNewObj();
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNewObj;
let b = { c: 2 };
tmpNewObj = function () {
  var tmpAssignMemLhsObj;
  var tmpAssignMemLhsObj$1;
  var tmpAssignMemLhsObj$2;
  var tmpAssignMemRhs;
  var tmpNestedAssignObj;
  var tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj = $(b);
  tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  tmpNestedAssignObj = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpAssignMemRhs = tmpNestedPropAssignRhs;
  tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
  tmpAssignMemLhsObj$2.c = tmpAssignMemRhs;
  let tmpReturnArg = tmpAssignMemRhs;
  return tmpReturnArg;
};
tmpNewObj();
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: 1,{"c":3},"unused",3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
