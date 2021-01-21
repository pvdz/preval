# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > stmt > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
a[$('x')] *= b + c;
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
tmpAssignComputedRhs = b + c;
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
tmpAssignComputedRhs = 5;
tmpCompoundAssignComputedObj = tmpAssignComputedObj;
tmpCompoundAssignComputedProp = tmpAssignComputedProp;
tmpCompoundAssignComputedRhs = tmpAssignComputedRhs;
tmpAssignComputedObj_1 = tmpCompoundAssignComputedObj;
tmpAssignComputedProp_1 = tmpCompoundAssignComputedProp;
tmpBinaryLeft = tmpCompoundAssignComputedObj[tmpCompoundAssignComputedProp];
tmpAssignComputedRhs_1 = tmpBinaryLeft * tmpCompoundAssignComputedRhs;
tmpAssignComputedObj_1[tmpAssignComputedProp_1] = tmpAssignComputedRhs_1;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {"x":10,"undefined":null},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [{ x: 10, undefined: null }, 5, 3], null];

