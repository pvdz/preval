# Preval test case

# while_loop_excluded.md

> Let scoping > Ai > While loop excluded
>
> Test let scoping exclusion: let used in while loop should not be moved

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
while ($(true)) {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
  break;
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
while (true) {
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
if ($(true)) {
  $(false);
}
while (true) {
  if ($(true)) {
    if ($(true)) {
      x = $(2);
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
const b = $( true );
if (b) {
  $( false );
}
while (true) {
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
      x = $(2);
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
 - 1: true
 - 2: false
 - 3: true
 - 4: true
 - 5: 2
 - 6: '<function>'
 - 7: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
