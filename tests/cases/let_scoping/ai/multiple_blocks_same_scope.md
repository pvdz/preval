# Preval test case

# multiple_blocks_same_scope.md

> Let scoping > Ai > Multiple blocks same scope
>
> Test let scoping with multiple blocks in same scope: should not move

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
}
if ($(true)) {
  if ($(true)) x = $(3);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
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
const tmpIfTest$5 /*:unknown*/ = $(true);
if (tmpIfTest$5) {
  const tmpIfTest$7 /*:unknown*/ = $(true);
  if (tmpIfTest$7) {
    x = $(3);
  } else {
  }
  const tmpCalleeParam$1 /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam$1);
  $(x);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
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
let a = 1;
const b = $( true );
if (b) {
  $( false );
}
const c = $( true );
if (c) {
  const d = $( true );
  if (d) {
    a = $( 2 );
  }
  const e = function() {
    debugger;
    return a;
  };
  $( e );
  $( a );
}
const f = $( true );
if (f) {
  const g = $( true );
  if (g) {
    a = $( 3 );
  }
  const h = function() {
    debugger;
    return a;
  };
  $( h );
  $( a );
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
} else {
}
const tmpIfTest$5 = $(true);
if (tmpIfTest$5) {
  const tmpIfTest$7 = $(true);
  if (tmpIfTest$7) {
    x = $(3);
  } else {
  }
  let tmpCalleeParam$1 = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam$1);
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
 - 6: '<function>'
 - 7: 2
 - 8: true
 - 9: true
 - 10: 3
 - 11: '<function>'
 - 12: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
