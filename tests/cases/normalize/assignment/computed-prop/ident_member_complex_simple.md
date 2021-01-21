# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > computed-prop > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
let obj = {};
obj[a = $(b).x = c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
let obj = {};
{
  tmpAssignComputedObj = obj;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.x = c;
  tmpNestedComplexRhs = c;
  a = tmpNestedComplexRhs;
  tmpAssignComputedProp = tmpNestedComplexRhs;
  tmpAssignComputedRhs = 1000;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let obj = {};
tmpAssignComputedObj = obj;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.x = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpAssignComputedProp = tmpNestedComplexRhs;
tmpAssignComputedRhs = 1000;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same