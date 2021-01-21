# Preval test case

# member_complex_bin.md

> normalize > assignment > for-c > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 1;
for (;n-->0;  $(a).x = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
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
          tmpAssignMemLhsObj = $(a);
          tmpAssignMemRhs = b + c;
          tmpAssignMemLhsObj.x = tmpAssignMemRhs;
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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = { x: 10 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemRhs = 5;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
