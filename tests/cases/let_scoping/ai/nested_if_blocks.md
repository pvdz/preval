# Preval test case

# nested_if_blocks.md

> Let scoping > Ai > Nested if blocks
>
> Test let scoping with nested if blocks: let used only in inner block

## Input

`````js filename=intro
let x = 1;
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) {
    if ($(true)) x = $(2);
    $(() => x);
    $(x);
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
    let x /*:unknown*/ = 1;
    const tmpIfTest$5 /*:unknown*/ = $(true);
    if (tmpIfTest$5) {
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
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
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
    let d = 1;
    const e = $( true );
    if (e) {
      d = $( 2 );
    }
    const f = function() {
      debugger;
      return d;
    };
    $( f );
    $( d );
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
 - 6: 2
 - 7: '<function>'
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
