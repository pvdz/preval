# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > for-b > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (;a[$('x')] = b + c;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  while (true) {
    {
      let tmpBindInitMemberObject = a;
      let tmpBindInitRhs = b + c;
      tmpAssignedComputedObj = tmpBindInitMemberObject;
      tmpAssignedComputedProp = $('x');
      tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpBindInitRhs;
      let ifTestTmp = tmpBindInitRhs;
      if (ifTestTmp) {
        break;
      } else {
      }
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
  let tmpBindInitMemberObject = a;
  tmpAssignedComputedObj = tmpBindInitMemberObject;
  tmpAssignedComputedProp = $('x');
  tmpAssignedComputedObj[tmpAssignedComputedProp] = 5;
  break;
}
$(a, 5, 3);
`````
