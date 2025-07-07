# Preval test case

# surviving_let_multiple_vars.md

> Let scoping > Ai > Surviving let multiple vars
>
> Test let scoping: multiple let variables that survive and should be moved

## Input

`````js filename=intro
let x = 1;
let y = 2;
$(3);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(4);
  y = $(5);
  if ($(true)) x = $(6);
  y = $(7);
  $(() => x);
  $(x);
  $(y);
}
`````


## Settled


`````js filename=intro
$(3);
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
    x = $(4);
    $(5);
  } else {
    $(5);
  }
  const tmpIfTest$5 /*:unknown*/ = $(true);
  if (tmpIfTest$5) {
    x = $(6);
  } else {
  }
  const tmpSSA_y /*:unknown*/ = $(7);
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
  $(tmpSSA_y);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
if ($(true)) {
  $(false);
}
if ($(true)) {
  let x = 1;
  if ($(true)) {
    x = $(4);
    $(5);
  } else {
    $(5);
  }
  if ($(true)) {
    x = $(6);
  }
  const tmpSSA_y = $(7);
  $(function () {
    return x;
  });
  $(x);
  $(tmpSSA_y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
const a = $( true );
if (a) {
  $( false );
}
const b = $( true );
if (b) {
  let c = 1;
  const d = $( true );
  if (d) {
    c = $( 4 );
    $( 5 );
  }
  else {
    $( 5 );
  }
  const e = $( true );
  if (e) {
    c = $( 6 );
  }
  const f = $( 7 );
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
let y = 2;
$(3);
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(4);
  } else {
  }
  y = $(5);
  const tmpIfTest$5 = $(true);
  if (tmpIfTest$5) {
    x = $(6);
  } else {
  }
  y = $(7);
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
 - 1: 3
 - 2: true
 - 3: false
 - 4: true
 - 5: true
 - 6: 4
 - 7: 5
 - 8: true
 - 9: 6
 - 10: 7
 - 11: '<function>'
 - 12: 6
 - 13: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
