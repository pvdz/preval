# Preval test case

# member_complex_simple.md

> normalize > assignment > for-c > member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
let n = 1;
for (;n-->0;  $(a).x = b);
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
      tmpBinaryLeft = n;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        tmpAssignMemLhsObj = $(a);
        tmpAssignMemRhs = b;
        tmpAssignMemLhsObj.x = tmpAssignMemRhs;
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
  tmpBinaryLeft = n;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemRhs = 2;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], "<crash[ Cannot set property 'x' of undefined ]>"];

Normalized calls: BAD?!
[[{ x: 10 }, 2, 3], null];

Final output calls: BAD!!
[[{ x: 10 }, 2, 3], null];

