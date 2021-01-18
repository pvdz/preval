# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > let > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let wat = a[$('x')] = b;
$(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpAssignedComputedObj = a;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = b;
let wat = b;
$(wat);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
tmpAssignedComputedObj = a;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = 2;
$(2);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['x'], [2], [{ x: 10, undefined: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
