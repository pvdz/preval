# Preval test case

# member_complex_simple.md

> normalize > assignment > computed-prop > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let obj = {};
obj[$(a).x = b] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedAssignObj;
let a = { x: 10 };
let b = 2;
let c = 3;
let obj = {};
{
  tmpAssignComputedObj = obj;
  tmpNestedAssignObj = $(a);
  tmpNestedAssignObj.x = b;
  tmpAssignComputedProp = b;
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
var tmpNestedAssignObj;
let a = { x: 10 };
let obj = {};
tmpAssignComputedObj = obj;
tmpNestedAssignObj = $(a);
tmpNestedAssignObj.x = 2;
tmpAssignComputedProp = 2;
tmpAssignComputedRhs = 1000;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], "<crash[ Cannot set property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
