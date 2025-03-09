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

## Settled


`````js filename=intro
let blob /*:object*/ = { thing: `woop`, xyz: 1 };
$(blob);
const tmpBinLhs$1 /*:unknown*/ = blob.xyz;
const tmpIfTest /*:boolean*/ = tmpBinLhs$1 < 10;
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    blob = { thing: `woop`, xyz: 1 };
    $(blob);
    const tmpBinLhs$2 /*:unknown*/ = blob.xyz;
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$2 < 10;
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(blob);
} else {
  $(blob);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let blob = { thing: `woop`, xyz: 1 };
$(blob);
if (blob.xyz < 10) {
  while (true) {
    blob = { thing: `woop`, xyz: 1 };
    $(blob);
    if (!(blob.xyz < 10)) {
      break;
    }
  }
  $(blob);
} else {
  $(blob);
}
`````

## Pre Normal


`````js filename=intro
let blob;
while (true) {
  {
    blob = { thing: `woop`, xyz: 0 };
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
let blob = undefined;
while (true) {
  blob = { thing: `woop`, xyz: 0 };
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

## PST Settled
With rename=true

`````js filename=intro
let a = {
  thing: "woop",
  xyz: 1,
};
$( a );
const b = a.xyz;
const c = b < 10;
if (c) {
  while ($LOOP_UNROLL_10) {
    a = {
      thing: "woop",
      xyz: 1,
    };
    $( a );
    const d = a.xyz;
    const e = d < 10;
    if (e) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check