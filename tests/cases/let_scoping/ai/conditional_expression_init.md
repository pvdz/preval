# Preval test case

# conditional_expression_init.md

> Let scoping > Ai > Conditional expression init
>
> Test let scoping with conditional expression initializer

## Input

`````js filename=intro
let x = $(0) ? $(1) : $(2);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(3);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  x = $(1);
} else {
  x = $(2);
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  $(false);
} else {
}
const tmpIfTest$3 /*:unknown*/ = $(true);
if (tmpIfTest$3) {
  const tmpIfTest$5 /*:unknown*/ = $(true);
  if (tmpIfTest$5) {
    x = $(3);
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
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if ($(0)) {
  x = $(1);
} else {
  x = $(2);
}
if ($(true)) {
  $(false);
}
if ($(true)) {
  if ($(true)) {
    x = $(3);
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
let a = undefined;
const b = $( 0 );
if (b) {
  a = $( 1 );
}
else {
  a = $( 2 );
}
const c = $( true );
if (c) {
  $( false );
}
const d = $( true );
if (d) {
  const e = $( true );
  if (e) {
    a = $( 3 );
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
let x = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  x = $(1);
} else {
  x = $(2);
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  $(false);
} else {
}
const tmpIfTest$3 = $(true);
if (tmpIfTest$3) {
  const tmpIfTest$5 = $(true);
  if (tmpIfTest$5) {
    x = $(3);
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
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: true
 - 4: false
 - 5: true
 - 6: true
 - 7: 3
 - 8: '<function>'
 - 9: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
