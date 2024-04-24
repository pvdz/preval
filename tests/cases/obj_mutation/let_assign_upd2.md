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
while (true) {
  if (tmpDoWhileFlag) {
    const tmpAssignMemLhsObj = blob;
    const tmpBinLhs = blob.xyz;
    const tmpAssignMemRhs = tmpBinLhs + 1;
    tmpAssignMemLhsObj.xyz = tmpAssignMemRhs;
    $(blob);
    const tmpBinLhs$1 = blob.xyz;
    tmpDoWhileFlag = tmpBinLhs$1 < 10;
  } else {
    break;
  }
}
$(blob);
`````

## Output

`````js filename=intro
const blob = { thing: `woop`, xyz: 1 };
$(blob);
const tmpBinLhs$1 = blob.xyz;
let tmpSSA_tmpDoWhileFlag = tmpBinLhs$1 < 10;
if (tmpSSA_tmpDoWhileFlag) {
  const tmpBinLhs$2 = blob.xyz;
  const tmpAssignMemRhs$1 = tmpBinLhs$2 + 1;
  blob.xyz = tmpAssignMemRhs$1;
  $(blob);
  const tmpBinLhs$4 = blob.xyz;
  tmpSSA_tmpDoWhileFlag = tmpBinLhs$4 < 10;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      const tmpBinLhs$3 = blob.xyz;
      const tmpAssignMemRhs$2 = tmpBinLhs$3 + 1;
      blob.xyz = tmpAssignMemRhs$2;
      $(blob);
      const tmpBinLhs$5 = blob.xyz;
      tmpSSA_tmpDoWhileFlag = tmpBinLhs$5 < 10;
    } else {
      break;
    }
  }
} else {
}
$(blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
thing: "woop",
xyz: 1
;
$( a );
const b = a.xyz;
let c = b < 10;
if (c) {
  const d = a.xyz;
  const e = d + 1;
  a.xyz = e;
  $( a );
  const f = a.xyz;
  c = f < 10;
  while ($LOOP_UNROLL_9) {
    if (c) {
      const g = a.xyz;
      const h = g + 1;
      a.xyz = h;
      $( a );
      const i = a.xyz;
      c = i < 10;
    }
    else {
      break;
    }
  }
}
$( a );
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
