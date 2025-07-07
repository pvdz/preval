# Preval test case

# surviving_let_else_only.md

> Let scoping > Ai > Surviving let else only
>
> Test let scoping: let used only in else block that survives and should be moved

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  $(3);
} else {
  if ($(true)) x = $(4);
  if ($(true)) x = $(5);
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
  $(3);
} else {
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(4);
  } else {
  }
  const tmpIfTest$5 /*:unknown*/ = $(true);
  if (tmpIfTest$5) {
    x = $(5);
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
if ($(true)) {
  $(3);
} else {
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
let a = 1;
$( 2 );
const b = $( true );
if (b) {
  $( false );
}
const c = $( true );
if (c) {
  $( 3 );
}
else {
  const d = $( true );
  if (d) {
    a = $( 4 );
  }
  const e = $( true );
  if (e) {
    a = $( 5 );
  }
  const f = function() {
    debugger;
    return a;
  };
  $( f );
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
  $(3);
} else {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(4);
  } else {
  }
  const tmpIfTest$5 = $(true);
  if (tmpIfTest$5) {
    x = $(5);
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
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
