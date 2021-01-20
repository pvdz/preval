# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > stmt > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(a)[$('x')] *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpCompoundAssignComputedObj;
var tmpCompoundAssignComputedProp;
var tmpCompoundAssignComputedRhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpCompoundAssignComputedObj = $(a);
tmpCompoundAssignComputedProp = $('x');
tmpCompoundAssignComputedRhs = b;
{
  tmpAssignComputedObj = tmpCompoundAssignComputedObj;
  tmpAssignComputedProp = tmpCompoundAssignComputedProp;
  tmpBinaryLeft = tmpCompoundAssignComputedObj[tmpCompoundAssignComputedProp];
  tmpAssignComputedRhs = tmpBinaryLeft * tmpCompoundAssignComputedRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpCompoundAssignComputedObj;
var tmpCompoundAssignComputedProp;
var tmpCompoundAssignComputedRhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpBinaryLeft;
let a = { x: 10 };
tmpCompoundAssignComputedObj = $(a);
tmpCompoundAssignComputedProp = $('x');
tmpCompoundAssignComputedRhs = 2;
tmpAssignComputedObj = tmpCompoundAssignComputedObj;
tmpAssignComputedProp = tmpCompoundAssignComputedProp;
tmpBinaryLeft = tmpCompoundAssignComputedObj[tmpCompoundAssignComputedProp];
tmpAssignComputedRhs = tmpBinaryLeft * tmpCompoundAssignComputedRhs;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], ['x'], "<crash[ Cannot read property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
