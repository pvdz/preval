# Preval test case

# surviving_let_if_else_both.md

> Let scoping > Ai > Surviving let if else both
>
> Test let scoping: let used in both if and else blocks (should not move)

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(3);
  if ($(true)) x = $(4);
  $(x);
} else {
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
const tmpIfTest$3 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
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
  if (tmpIfTest$3) {
    x = $(5);
  } else {
  }
  const tmpIfTest$9 /*:unknown*/ = $(true);
  if (tmpIfTest$9) {
    x = $(6);
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
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
const tmpIfTest$1 = $(true);
const tmpIfTest$3 = $(true);
if (tmpIfTest$1) {
  if (tmpIfTest$3) {
    x = $(3);
  }
  if ($(true)) {
    x = $(4);
    $(x);
  } else {
    $(x);
  }
} else {
  if (tmpIfTest$3) {
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
const d = $( true );
if (c) {
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
else {
  if (d) {
    a = $( 5 );
  }
  const f = $( true );
  if (f) {
    a = $( 6 );
  }
  const g = function() {
    debugger;
    return a;
  };
  $( g );
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
  const tmpIfTest$7 = $(true);
  if (tmpIfTest$7) {
    x = $(5);
  } else {
  }
  const tmpIfTest$9 = $(true);
  if (tmpIfTest$9) {
    x = $(6);
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
