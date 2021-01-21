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
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = tmpPostfixArg;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        {
          tmpAssignComputedObj = a;
          tmpAssignComputedProp = $('x');
          tmpAssignComputedRhs = b + c;
          tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
        }
      } else {
        break;
      }
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
let a = { x: 10 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpAssignComputedObj = a;
    tmpAssignComputedProp = $('x');
    tmpAssignComputedRhs = 5;
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  } else {
    break;
  }
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: {"x":10,"undefined":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [{ x: 10, undefined: 5 }, 5, 3], null];
