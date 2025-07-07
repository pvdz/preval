# Preval test case

# used_outside_block.md

> Let scoping > Ai > Used outside block
>
> Test let scoping exclusion: let used both inside and outside block

## Input

`````js filename=intro
let x = 1;
$(x);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
$(1);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
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
  $(x);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
$(1);
if ($(true)) {
  $(false);
}
if ($(true)) {
  if ($(true)) {
    x = $(2);
  }
  $(function () {
    return x;
  });
  $(x);
  $(x);
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
$( 1 );
const b = $( true );
if (b) {
  $( false );
}
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
  $( a );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
$(x);
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
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
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: true
 - 3: false
 - 4: true
 - 5: true
 - 6: 2
 - 7: '<function>'
 - 8: 2
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
