# Preval test case

# binary_expression_init.md

> Let scoping > Ai > Binary expression init
>
> Test let scoping with binary expression initializer

## Input

`````js filename=intro
let x = $(0) + $(1);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(0);
const tmpBinBothRhs /*:unknown*/ = $(1);
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
    x = $(2);
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
let x = $(0) + $(1);
if ($(true)) {
  $(false);
}
if ($(true)) {
  if ($(true)) {
    x = $(2);
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
const a = $( 0 );
const b = $( 1 );
let c = a + b;
const d = $( true );
if (d) {
  $( false );
}
const e = $( true );
if (e) {
  const f = $( true );
  if (f) {
    c = $( 2 );
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
const tmpBinBothLhs = $(0);
const tmpBinBothRhs = $(1);
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
    x = $(2);
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
 - 1: 0
 - 2: 1
 - 3: true
 - 4: false
 - 5: true
 - 6: true
 - 7: 2
 - 8: '<function>'
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
