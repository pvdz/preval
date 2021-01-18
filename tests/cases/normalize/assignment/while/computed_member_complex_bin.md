# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > while > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
while ($(a)[$('x')] = b + c);
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
    let tmpBindInitMemberObject = $(a);
    let tmpBindInitRhs = b + c;
    tmpAssignedComputedObj = tmpBindInitMemberObject;
    tmpAssignedComputedProp = $('x');
    tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpBindInitRhs;
    let ifTestTmp = tmpBindInitRhs;
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
  let tmpBindInitMemberObject = $(a);
  tmpAssignedComputedObj = tmpBindInitMemberObject;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = 5;
}
$(a, 5, 3);
`````
