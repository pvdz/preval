# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > for-c > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 1;
for (;n-->0;  a[$('x')] = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpBinaryLeft;
var tmpPostfixArg;
let a = { x: 10 };
let b = 2;
let c = 3;
let n = 1;
{
  while (true) {
    tmpPostfixArg = n;
    n = n - 1;
    tmpBinaryLeft = tmpPostfixArg;
    const tmpIfTest = tmpBinaryLeft > 0;
    if (tmpIfTest) {
      tmpAssignComMemLhsObj = a;
      tmpAssignComMemLhsProp = $('x');
      tmpAssignComputedObj = tmpAssignComMemLhsObj;
      tmpAssignComputedProp = tmpAssignComMemLhsProp;
      tmpAssignComputedRhs = b + c;
      tmpAssignMemLhsObj = tmpAssignComputedObj;
      tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpBinaryLeft;
var tmpPostfixArg;
let a = { x: 10 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  const tmpIfTest = tmpBinaryLeft > 0;
  if (tmpIfTest) {
    tmpAssignComMemLhsObj = a;
    tmpAssignComMemLhsProp = $('x');
    tmpAssignComputedObj = tmpAssignComMemLhsObj;
    tmpAssignComputedProp = tmpAssignComMemLhsProp;
    tmpAssignComputedRhs = 5;
    tmpAssignMemLhsObj = tmpAssignComputedObj;
    tmpAssignMemLhsObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  } else {
    break;
  }
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [{ x: 5 }, 5, 3], null];

