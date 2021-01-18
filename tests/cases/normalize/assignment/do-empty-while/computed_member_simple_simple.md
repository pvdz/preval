# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > do-while > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
do {} while (a[$('x')] = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let b = 2;
let c = 3;
while (true) {
  {
    tmpAssignedComputedObj = a;
    tmpAssignedComputedProp = $('x');
    tmpAssignedComputedObj[tmpAssignedComputedProp] = b;
    let ifTestTmp = b;
    if (ifTestTmp) {
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
while (true) {
  tmpAssignedComputedObj = a;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = 2;
}
$(a, 2, 3);
`````
