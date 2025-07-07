# Preval test case

# surviving_let_while_loop.md

> Let scoping > Ai > Surviving let while loop
>
> Test let scoping: let used in while loop (should not move)

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
while ($(true)) {
  if ($(true)) x = $(3);
  if ($(true)) x = $(4);
  $(() => x);
  $(x);
  break;
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
while (true) {
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
    break;
  } else {
    break;
  }
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
while (true) {
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
    break;
  } else {
    break;
  }
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
while (true) {
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
    break;
  }
  else {
    break;
  }
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
while (true) {
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
    break;
  } else {
    break;
  }
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
 - 9: '<function>'
 - 10: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
