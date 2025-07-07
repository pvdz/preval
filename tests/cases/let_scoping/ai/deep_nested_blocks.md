# Preval test case

# deep_nested_blocks.md

> Let scoping > Ai > Deep nested blocks
>
> Test let scoping with deeply nested blocks: move to deepest block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) {
    if ($(true)) {
      if ($(true)) x = $(2);
      $(() => x);
      $(x);
    }
  }
}
`````


## Settled


`````js filename=intro
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
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
if ($(true)) {
  if ($(true)) {
    if ($(true)) {
      let x = 1;
      if ($(true)) {
        x = $(2);
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
        e = $( 2 );
      }
      const g = function() {
        debugger;
        return e;
      };
      $( g );
      $( e );
    }
  }
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
    const tmpIfTest$5 = $(true);
    if (tmpIfTest$5) {
      const tmpIfTest$7 = $(true);
      if (tmpIfTest$7) {
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
 - 1: true
 - 2: false
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: 2
 - 8: '<function>'
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
