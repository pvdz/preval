# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > template > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${$(a)[$('x')] = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = `abc ${(((tmpAssignComputedObj = $(a)), (tmpAssignComputedProp = $('x')), (tmpAssignComputedRhs = b), tmpAssignComputedObj)[
  tmpAssignComputedProp
] = tmpAssignComputedRhs)} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
tmpArg = `abc ${(((tmpAssignComputedObj = $(a)), (tmpAssignComputedProp = $('x')), (tmpAssignComputedRhs = 2), tmpAssignComputedObj)[
  tmpAssignComputedProp
] = tmpAssignComputedRhs)} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
