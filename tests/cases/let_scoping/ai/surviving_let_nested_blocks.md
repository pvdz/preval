# Preval test case

# surviving_let_nested_blocks.md

> Let scoping > Ai > Surviving let nested blocks
>
> Test let scoping: let in nested blocks that survives and should be moved to deepest

## Input

`````js filename=intro
let x = 1;
$(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) {
    if ($(true)) {
      if ($(true)) x = $(3);
      if ($(true)) x = $(4);
      $(() => x);
      $(x);
    }
  }
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
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    const tmpIfTest$5 /*:unknown*/ = $(true);
    if (tmpIfTest$5) {
      let x /*:unknown*/ = 1;
      const tmpIfTest$7 /*:unknown*/ = $(true);
      if (tmpIfTest$7) {
        x = $(3);
      } else {
      }
      const tmpIfTest$9 /*:unknown*/ = $(true);
      if (tmpIfTest$9) {
        x = $(4);
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
  } else {
  }
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
  if ($(true)) {
    if ($(true)) {
      let x = 1;
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
    }
  }
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
  const c = $( true );
  if (c) {
    const d = $( true );
    if (d) {
      let e = 1;
      const f = $( true );
      if (f) {
        e = $( 3 );
      }
      const g = $( true );
      if (g) {
        e = $( 4 );
      }
      const h = function() {
        debugger;
        return e;
      };
      $( h );
      $( e );
    }
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
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    const tmpIfTest$5 = $(true);
    if (tmpIfTest$5) {
      const tmpIfTest$7 = $(true);
      if (tmpIfTest$7) {
        x = $(3);
      } else {
      }
      const tmpIfTest$9 = $(true);
      if (tmpIfTest$9) {
        x = $(4);
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
  } else {
  }
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
 - 6: true
 - 7: true
 - 8: 3
 - 9: true
 - 10: 4
 - 11: '<function>'
 - 12: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
