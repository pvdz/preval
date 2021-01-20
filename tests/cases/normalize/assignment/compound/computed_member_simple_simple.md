# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > stmt > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
a[$('x')] *= b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpCompoundAssignComputedObj;
var tmpCompoundAssignComputedProp;
var tmpCompoundAssignComputedRhs;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
var tmpBinaryLeft;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignComputedObj = a;
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = b;
tmpCompoundAssignComputedObj = tmpAssignComputedObj;
tmpCompoundAssignComputedProp = tmpAssignComputedProp;
tmpCompoundAssignComputedRhs = tmpAssignComputedRhs;
{
  tmpAssignComputedObj_1 = tmpCompoundAssignComputedObj;
  tmpAssignComputedProp_1 = tmpCompoundAssignComputedProp;
  tmpBinaryLeft = tmpCompoundAssignComputedObj[tmpCompoundAssignComputedProp];
  tmpAssignComputedRhs_1 = tmpBinaryLeft * tmpCompoundAssignComputedRhs;
  tmpAssignComputedObj_1[tmpAssignComputedProp_1] = tmpAssignComputedRhs_1;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpCompoundAssignComputedObj;
var tmpCompoundAssignComputedProp;
var tmpCompoundAssignComputedRhs;
var tmpAssignComputedObj_1;
var tmpAssignComputedProp_1;
var tmpAssignComputedRhs_1;
var tmpBinaryLeft;
let a = { x: 10 };
tmpAssignComputedObj = a;
tmpAssignComputedProp = $('x');
tmpAssignComputedRhs = 2;
tmpCompoundAssignComputedObj = tmpAssignComputedObj;
tmpCompoundAssignComputedProp = tmpAssignComputedProp;
tmpCompoundAssignComputedRhs = tmpAssignComputedRhs;
tmpAssignComputedObj_1 = tmpCompoundAssignComputedObj;
tmpAssignComputedProp_1 = tmpCompoundAssignComputedProp;
tmpBinaryLeft = tmpCompoundAssignComputedObj[tmpCompoundAssignComputedProp];
tmpAssignComputedRhs_1 = tmpBinaryLeft * tmpCompoundAssignComputedRhs;
tmpAssignComputedObj_1[tmpAssignComputedProp_1] = tmpAssignComputedRhs_1;
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['x'], [{ x: 10, undefined: null }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
