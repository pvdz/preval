# Preval test case

# surviving_let_used_outside.md

> Let scoping > Ai > Surviving let used outside
>
> Test let scoping: let used both inside and outside block (should not move)

## Input

`````js filename=intro
let x = 1;
$(x);
$(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(3);
  if ($(true)) x = $(4);
  $(() => x);
  $(x);
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
$(1);
$(2);
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
  const tmpIfTest$5 /*:unknown*/ = $(true);
  if (tmpIfTest$5) {
    x = $(4);
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  $(x);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
$(1);
$(2);
if ($(true)) {
  $(false);
}
if ($(true)) {
  if ($(true)) {
    x = $(3);
  }
  if ($(true)) {
    x = $(4);
  }
  $(function () {
    return x;
  });
  $(x);
  $(x);
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
$( 1 );
$( 2 );
const b = $( true );
if (b) {
  $( false );
}
const c = $( true );
if (c) {
  const d = $( true );
  if (d) {
    a = $( 3 );
  }
  const e = $( true );
  if (e) {
    a = $( 4 );
  }
  const f = function() {
    debugger;
    return a;
  };
  $( f );
  $( a );
  $( a );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
$(x);
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
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  $(x);
} else {
  $(x);
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
 - 8: true
 - 9: 4
 - 10: '<function>'
 - 11: 4
 - 12: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
