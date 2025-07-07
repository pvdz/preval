# Preval test case

# surviving_let_try_catch.md

> Let scoping > Ai > Surviving let try catch
>
> Test let scoping: let in try-catch that survives and should be moved into try

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
try {
  if ($(true)) x = $(3);
  if ($(true)) x = $(4);
  $(() => x);
  $(x);
} catch (e) {
  $(e);
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
try {
  const tmpIfTest$1 /*:unknown*/ = $(true);
  if (tmpIfTest$1) {
    x = $(3);
  } else {
  }
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(4);
  } else {
  }
  const tmpCalleeParam /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
} catch (e) {
  $(e);
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
try {
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
} catch (e) {
  $(e);
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
try {
  const c = $( true );
  if (c) {
    a = $( 3 );
  }
  const d = $( true );
  if (d) {
    a = $( 4 );
  }
  const e = function() {
    debugger;
    return a;
  };
  $( e );
  $( a );
}
catch (f) {
  $( f );
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
try {
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    x = $(3);
  } else {
  }
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(4);
  } else {
  }
  let tmpCalleeParam = function () {
    debugger;
    return x;
  };
  $(tmpCalleeParam);
  $(x);
} catch (e) {
  $(e);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: true
 - 3: false
 - 4: true
 - 5: 3
 - 6: true
 - 7: 4
 - 8: '<function>'
 - 9: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
