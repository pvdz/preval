# Preval test case

# unary_expression_init.md

> Let scoping > Ai > Unary expression init
>
> Test let scoping with unary expression initializer

## Input

`````js filename=intro
let x = !$(0);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(1);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(0);
let x /*:unknown*/ = !tmpUnaryArg;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 /*:unknown*/ = $(true);
  if (tmpIfTest$3) {
    x = $(1);
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
const tmpUnaryArg = $(0);
let x = !tmpUnaryArg;
if ($(true)) {
  $(false);
}
if ($(true)) {
  if ($(true)) {
    x = $(1);
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
const a = $( 0 );
let b = !a;
const c = $( true );
if (c) {
  $( false );
}
const d = $( true );
if (d) {
  const e = $( true );
  if (e) {
    b = $( 1 );
  }
  const f = function() {
    debugger;
    return b;
  };
  $( f );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $(0);
let x = !tmpUnaryArg;
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(false);
} else {
}
const tmpIfTest$1 = $(true);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(true);
  if (tmpIfTest$3) {
    x = $(1);
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
 - 2: true
 - 3: false
 - 4: true
 - 5: true
 - 6: 1
 - 7: '<function>'
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
