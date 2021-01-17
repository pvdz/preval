# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > template > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${a[$('x')] = b + c} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = `abc ${
  ((tmpAssignMemLhsObj = a),
  (tmpAssignMemRhs = b + c),
  (tmpAssignedComputedObj = tmpAssignMemLhsObj),
  (tmpAssignedComputedProp = $('x')),
  (tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs))
} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
tmpArg = `abc ${
  ((tmpAssignMemLhsObj = a),
  (tmpAssignMemRhs = 5),
  (tmpAssignedComputedObj = tmpAssignMemLhsObj),
  (tmpAssignedComputedProp = $('x')),
  (tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs))
} def`;
$(tmpArg);
$(a, 5, 3);
`````
