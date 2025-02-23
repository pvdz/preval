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
while (true) {
  {
    blob.xyz = blob.xyz + 1;
    $(blob);
  }
  if (blob.xyz < 10) {
  } else {
    break;
  }
}
$(blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `woop`, xyz: 0 };
while (true) {
  const tmpAssignMemLhsObj = blob;
  const tmpBinLhs = blob.xyz;
  const tmpAssignMemRhs = tmpBinLhs + 1;
  tmpAssignMemLhsObj.xyz = tmpAssignMemRhs;
  $(blob);
  const tmpBinLhs$1 = blob.xyz;
  const tmpIfTest = tmpBinLhs$1 < 10;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(blob);
`````

## Output


`````js filename=intro
const blob /*:object*/ = { thing: `woop`, xyz: 1 };
$(blob);
const tmpBinLhs$1 /*:unknown*/ = blob.xyz;
const tmpIfTest /*:boolean*/ = tmpBinLhs$1 < 10;
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpBinLhs$2 /*:unknown*/ = blob.xyz;
    const tmpAssignMemRhs$1 /*:primitive*/ = tmpBinLhs$2 + 1;
    blob.xyz = tmpAssignMemRhs$1;
    $(blob);
    const tmpBinLhs$4 /*:unknown*/ = blob.xyz;
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$4 < 10;
    if (tmpIfTest$1) {
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
  xyz: 1,
};
$( a );
const b = a.xyz;
const c = b < 10;
if (c) {
  while ($LOOP_UNROLL_10) {
    const d = a.xyz;
    const e = d + 1;
    a.xyz = e;
    $( a );
    const f = a.xyz;
    const g = f < 10;
    if (g) {

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
