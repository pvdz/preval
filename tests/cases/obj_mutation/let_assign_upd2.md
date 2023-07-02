# Preval test case

# let_assign_upd2.md

> Obj mutation > Let assign upd2
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop', xyz: 0};
do {
  blob.xyz = blob.xyz + 1;
  $(blob);
} while (blob.xyz < 10);
$(blob);
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `woop`, xyz: 0 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
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
const blob = { thing: `woop`, xyz: 0 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
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
let tmpDoWhileFlag = true;
const blob = { thing: `woop`, xyz: 0 };
while (tmpDoWhileFlag) {
  const tmpBinLhs = blob.xyz;
  const tmpAssignMemRhs = tmpBinLhs + 1;
  blob.xyz = tmpAssignMemRhs;
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
 - 2: { thing: '"woop"', xyz: '2' }
 - 3: { thing: '"woop"', xyz: '3' }
 - 4: { thing: '"woop"', xyz: '4' }
 - 5: { thing: '"woop"', xyz: '5' }
 - 6: { thing: '"woop"', xyz: '6' }
 - 7: { thing: '"woop"', xyz: '7' }
 - 8: { thing: '"woop"', xyz: '8' }
 - 9: { thing: '"woop"', xyz: '9' }
 - 10: { thing: '"woop"', xyz: '10' }
 - 11: { thing: '"woop"', xyz: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
