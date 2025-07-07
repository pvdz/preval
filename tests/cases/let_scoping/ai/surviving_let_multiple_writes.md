# Preval test case

# surviving_let_multiple_writes.md

> Let scoping > Ai > Surviving let multiple writes
>
> Test let scoping: let with multiple writes that survives and should be moved

## Input

`````js filename=intro
let x = undefined;
$(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(3);
  if ($(true)) x = $(4);
  if ($(true)) x = $(5);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
$(2);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  let x /*:unknown*/ = undefined;
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(3);
  } else {
  }
  const tmpIfTest$5 /*:unknown*/ = $(true);
  if (tmpIfTest$5) {
    x = $(4);
  } else {
  }
  const tmpIfTest$7 /*:unknown*/ = $(true);
  if (tmpIfTest$7) {
    x = $(5);
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
$(2);
if ($(true)) {
  $(false);
}
if ($(true)) {
  let x = undefined;
  if ($(true)) {
    x = $(3);
  }
  if ($(true)) {
    x = $(4);
  }
  if ($(true)) {
    x = $(5);
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
$( 2 );
const a = $( true );
if (a) {
  $( false );
}
const b = $( true );
if (b) {
  let c = undefined;
  const d = $( true );
  if (d) {
    c = $( 3 );
  }
  const e = $( true );
  if (e) {
    c = $( 4 );
  }
  const f = $( true );
  if (f) {
    c = $( 5 );
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
let x = undefined;
$(2);
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
  const tmpIfTest$5 = $(true);
  if (tmpIfTest$5) {
    x = $(4);
  } else {
  }
  const tmpIfTest$7 = $(true);
  if (tmpIfTest$7) {
    x = $(5);
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
 - 1: 2
 - 2: true
 - 3: false
 - 4: true
 - 5: true
 - 6: 3
 - 7: true
 - 8: 4
 - 9: true
 - 10: 5
 - 11: '<function>'
 - 12: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
