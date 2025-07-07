# Preval test case

# surviving_let_multiple_blocks.md

> Let scoping > Ai > Surviving let multiple blocks
>
> Test let scoping: let used in multiple blocks (should not move)

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(3);
  if ($(true)) x = $(4);
  $(x);
}
if ($(true)) {
  if ($(true)) x = $(5);
  if ($(true)) x = $(6);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
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
    $(x);
  } else {
    $(x);
  }
} else {
}
const tmpIfTest$7 /*:unknown*/ = $(true);
if (tmpIfTest$7) {
  const tmpIfTest$9 /*:unknown*/ = $(true);
  if (tmpIfTest$9) {
    x = $(5);
  } else {
  }
  const tmpIfTest$11 /*:unknown*/ = $(true);
  if (tmpIfTest$11) {
    x = $(6);
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
let x = 1;
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
    $(x);
  } else {
    $(x);
  }
}
if ($(true)) {
  if ($(true)) {
    x = $(5);
  }
  if ($(true)) {
    x = $(6);
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
    $( a );
  }
  else {
    $( a );
  }
}
const f = $( true );
if (f) {
  const g = $( true );
  if (g) {
    a = $( 5 );
  }
  const h = $( true );
  if (h) {
    a = $( 6 );
  }
  const i = function() {
    debugger;
    return a;
  };
  $( i );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
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
    $(x);
  } else {
    $(x);
  }
} else {
}
const tmpIfTest$7 = $(true);
if (tmpIfTest$7) {
  const tmpIfTest$9 = $(true);
  if (tmpIfTest$9) {
    x = $(5);
  } else {
  }
  const tmpIfTest$11 = $(true);
  if (tmpIfTest$11) {
    x = $(6);
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
 - 9: 4
 - 10: true
 - 11: true
 - 12: 5
 - 13: true
 - 14: 6
 - 15: '<function>'
 - 16: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
