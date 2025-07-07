# Preval test case

# multiple_writes_in_block.md

> Let scoping > Ai > Multiple writes in block
>
> Test let scoping with multiple writes in the same block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  if ($(true)) x = $(3);
  $(() => x);
  $(x);
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
  const tmpIfTest$5 /*:unknown*/ = $(true);
  if (tmpIfTest$5) {
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
if ($(true)) {
  $(false);
}
if ($(true)) {
  let x = 1;
  if ($(true)) {
    x = $(2);
  }
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
  const e = $( true );
  if (e) {
    c = $( 3 );
  }
  const f = function() {
    debugger;
    return c;
  };
  $( f );
  $( c );
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
  const tmpIfTest$5 = $(true);
  if (tmpIfTest$5) {
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
 - 1: true
 - 2: false
 - 3: true
 - 4: true
 - 5: 2
 - 6: true
 - 7: 3
 - 8: '<function>'
 - 9: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
