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
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
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
        tmpAssignMemLhsObj = $(a);
        tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
        tmpAssignMemRhs = b + c;
        tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
        tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
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
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
let a = { x: 10 };
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
    tmpAssignMemRhs = 5;
    tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
    tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], [{ x: 5 }, 5, 3], null];

