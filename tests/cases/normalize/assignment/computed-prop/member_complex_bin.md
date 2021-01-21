# Preval test case

# member_complex_bin.md

> normalize > assignment > computed-prop > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let obj = {};
obj[$(a).x = b + c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
let obj = {};
{
  tmpAssignComputedObj = obj;
  tmpNestedAssignMemberObj = $(a);
  tmpNestedAssignMemberRhs = b + c;
  tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
  tmpAssignComputedProp = tmpNestedAssignMemberRhs;
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
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let obj = {};
tmpAssignComputedObj = obj;
tmpNestedAssignMemberObj = $(a);
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignComputedProp = tmpNestedAssignMemberRhs;
tmpAssignComputedRhs = 1000;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
