# Preval test case

# complex_init_excluded.md

> Let scoping > Ai > Complex init excluded
>
> Test let scoping exclusion: let with complex initializer should not be moved

## Input

`````js filename=intro
let x = $(1) + $(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(3);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
let x /*:unknown*/ = tmpBinBothLhs + tmpBinBothRhs;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(3);
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(1) + $(2);
if ($(true)) {
  $(false);
}
if ($(true)) {
  if ($(true)) {
    x = $(3);
  }
  $(function () {
    return x;
  });
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = a + b;
const d = $( true );
if (d) {
  $( false );
}
const e = $( true );
if (e) {
  const f = $( true );
  if (f) {
    c = $( 3 );
  }
  const g = function() {
    debugger;
    return c;
  };
  $( g );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
let x = tmpBinBothLhs + tmpBinBothRhs;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(3);
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
} else {
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
 - 3: true
 - 4: false
 - 5: true
 - 6: true
 - 7: 3
 - 8: '<function>'
 - 9: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
