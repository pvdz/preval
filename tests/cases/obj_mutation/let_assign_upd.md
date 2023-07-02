# Preval test case

# let_assign_upd.md

> Obj mutation > Let assign upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
let blob;
do {
  blob = {thing: 'woop', xyz: 0};
  blob.xyz = blob.xyz + 1;
  $(blob);
} while (blob.xyz < 10);
$(blob);
`````

## Pre Normal

`````js filename=intro
let blob;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      blob = { thing: `woop`, xyz: 0 };
      blob.xyz = blob.xyz + 1;
      $(blob);
    }
    tmpDoWhileFlag = blob.xyz < 10;
  }
}
$(blob);
`````

## Normalized

`````js filename=intro
let blob = undefined;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  blob = { thing: `woop`, xyz: 0 };
  const tmpAssignMemLhsObj = blob;
  const tmpBinLhs = blob.xyz;
  const tmpAssignMemRhs = tmpBinLhs + 1;
  tmpAssignMemLhsObj.xyz = tmpAssignMemRhs;
  $(blob);
  const tmpBinLhs$1 = blob.xyz;
  tmpDoWhileFlag = tmpBinLhs$1 < 10;
}
$(blob);
`````

## Output

`````js filename=intro
let blob = undefined;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  blob = { thing: `woop`, xyz: 0 };
  const tmpAssignMemLhsObj = blob;
  const tmpBinLhs = blob.xyz;
  const tmpAssignMemRhs = tmpBinLhs + 1;
  tmpAssignMemLhsObj.xyz = tmpAssignMemRhs;
  $(blob);
  const tmpBinLhs$1 = blob.xyz;
  tmpDoWhileFlag = tmpBinLhs$1 < 10;
}
$(blob);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { thing: '"woop"', xyz: '1' }
 - 2: { thing: '"woop"', xyz: '1' }
 - 3: { thing: '"woop"', xyz: '1' }
 - 4: { thing: '"woop"', xyz: '1' }
 - 5: { thing: '"woop"', xyz: '1' }
 - 6: { thing: '"woop"', xyz: '1' }
 - 7: { thing: '"woop"', xyz: '1' }
 - 8: { thing: '"woop"', xyz: '1' }
 - 9: { thing: '"woop"', xyz: '1' }
 - 10: { thing: '"woop"', xyz: '1' }
 - 11: { thing: '"woop"', xyz: '1' }
 - 12: { thing: '"woop"', xyz: '1' }
 - 13: { thing: '"woop"', xyz: '1' }
 - 14: { thing: '"woop"', xyz: '1' }
 - 15: { thing: '"woop"', xyz: '1' }
 - 16: { thing: '"woop"', xyz: '1' }
 - 17: { thing: '"woop"', xyz: '1' }
 - 18: { thing: '"woop"', xyz: '1' }
 - 19: { thing: '"woop"', xyz: '1' }
 - 20: { thing: '"woop"', xyz: '1' }
 - 21: { thing: '"woop"', xyz: '1' }
 - 22: { thing: '"woop"', xyz: '1' }
 - 23: { thing: '"woop"', xyz: '1' }
 - 24: { thing: '"woop"', xyz: '1' }
 - 25: { thing: '"woop"', xyz: '1' }
 - 26: { thing: '"woop"', xyz: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
