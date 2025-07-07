# Preval test case

# binary_expression_in_block.md

> Let scoping > Ai > Binary expression in block
>
> Test let scoping with binary expression in block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  const y = x + $(3);
  $(() => x);
  $(x);
  $(y);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  let x /*:unknown*/ = 1;
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(2);
  } else {
  }
  const tmpBinBothRhs /*:unknown*/ = $(3);
  const y /*:primitive*/ = x + tmpBinBothRhs;
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  $(y);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
if ($(true)) {
  let x = 1;
  if ($(true)) {
    x = $(2);
  }
  const y = x + $(3);
  $(function () {
    return x;
  });
  $(x);
  $(y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
const b = $( true );
if (b) {
  let c = 1;
  const d = $( true );
  if (d) {
    c = $( 2 );
  }
  const e = $( 3 );
  const f = c + e;
  const g = function() {
    debugger;
    return c;
  };
  $( g );
  $( c );
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
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
  const tmpBinBothLhs = x;
  const tmpBinBothRhs = $(3);
  const y = tmpBinBothLhs + tmpBinBothRhs;
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  $(y);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: true
 - 5: 2
 - 6: 3
 - 7: '<function>'
 - 8: 2
 - 9: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
