# Preval test case

# complex_logic.md

> Tofix > complex logic

This is from a simple switch case where A falls through to B and so
it's basically `if (x) { $(A); $(B); } else if (y) $(B) else if (z) $(C);`
but we would have to risk some big duplication (of the `$(B)` expression)
to arrive to that minimal end state.

Disregarding that: if abc=true then xyz must be true in the second if.
if abc=false then xyz can be either. however, when code would enter the
second else branch then we could know that abc must be false, since that is
the only way for it to arrive there.
Logic is sound but probably tricky to implement. Not sure how useful as a 
one-of targeted case. Maybe.

## Input

`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
let xyz /*:boolean*/ /*ternaryConst*/ = true;
const abc /*:boolean*/ = undefined === tmpBinBothRhs;
if (abc) {
  $(`A`);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  xyz = undefined === tmpBinBothRhs$1;
}
if (xyz) {
  $(`B`);
} else {
  // abc must be `false` here
  let tmpIfTest$3 /*:boolean*/ /*ternaryConst*/ = abc;
  if (abc) {
  } else {
    const tmpBinBothRhs$3 /*:unknown*/ = $(3);
    tmpIfTest$3 = undefined === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    $(`C`);
  } else {
  }
}
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
let xyz /*:boolean*/ /*ternaryConst*/ = true;
const abc /*:boolean*/ = undefined === tmpBinBothRhs;
if (abc) {
  $(`A`);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  xyz = undefined === tmpBinBothRhs$1;
}
if (xyz) {
  $(`B`);
} else {
  let tmpIfTest$3 /*:boolean*/ /*ternaryConst*/ = abc;
  if (abc) {
  } else {
    const tmpBinBothRhs$3 /*:unknown*/ = $(3);
    tmpIfTest$3 = undefined === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    $(`C`);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
let xyz = true;
const abc = undefined === tmpBinBothRhs;
if (abc) {
  $(`A`);
} else {
  xyz = undefined === $(2);
}
if (xyz) {
  $(`B`);
} else {
  let tmpIfTest$3 = abc;
  if (!abc) {
    tmpIfTest$3 = undefined === $(3);
  }
  if (tmpIfTest$3) {
    $(`C`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = true;
const c = undefined === a;
if (c) {
  $( "A" );
}
else {
  const d = $( 2 );
  b = undefined === d;
}
if (b) {
  $( "B" );
}
else {
  let e = c;
  if (c) {

  }
  else {
    const f = $( 3 );
    e = undefined === f;
  }
  if (e) {
    $( "C" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothRhs = $(1);
let xyz = true;
const abc = undefined === tmpBinBothRhs;
if (abc) {
  $(`A`);
} else {
  const tmpBinBothRhs$1 = $(2);
  xyz = undefined === tmpBinBothRhs$1;
}
if (xyz) {
  $(`B`);
} else {
  let tmpIfTest$3 = abc;
  if (abc) {
  } else {
    const tmpBinBothRhs$3 = $(3);
    tmpIfTest$3 = undefined === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    $(`C`);
  } else {
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
