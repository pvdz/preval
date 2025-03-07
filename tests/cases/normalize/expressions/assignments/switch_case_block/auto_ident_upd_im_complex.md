# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Switch case block > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $($(b)).x--;
  }
}
$(a, b);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
  const tmpAssignMemRhs /*:number*/ = tmpPostUpdArgVal - 1;
  tmpPostUpdArgObj.x = tmpAssignMemRhs;
  $(tmpPostUpdArgVal, b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const b = { x: 1 };
if (tmpIfTest) {
  const tmpPostUpdArgObj = $($(b));
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  tmpPostUpdArgObj.x = tmpPostUpdArgVal - 1;
  $(tmpPostUpdArgVal, b);
} else {
  $({ a: 999, b: 1000 }, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = $($(b)).x--;
    }
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpPostUpdArgObj = $(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
} else {
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = { x: 1 };
if (c) {
  const e = $( d );
  const f = $( e );
  const g = f.x;
  const h = g - 1;
  f.x = h;
  $( g, d );
}
else {
  const i = {
    a: 999,
    b: 1000,
  };
  $( i, d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: { x: '1' }
 - 5: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
