# Preval test case

# call_expression_in_block.md

> Let scoping > Ai > Call expression in block
>
> Test let scoping with call expression in block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
  $(x, $(3));
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
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  const tmpCalleeParam$3 /*:unknown*/ = $(3);
  $(x, tmpCalleeParam$3);
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
  $(function () {
    return x;
  });
  $(x);
  $(x, $(3));
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
  const e = function() {
    debugger;
    return c;
  };
  $( e );
  $( c );
  const f = $( 3 );
  $( c, f );
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
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  let tmpCalleeParam$1 = x;
  let tmpCalleeParam$3 = $(3);
  $(tmpCalleeParam$1, tmpCalleeParam$3);
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
 - 6: '<function>'
 - 7: 2
 - 8: 3
 - 9: 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
