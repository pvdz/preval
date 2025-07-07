# Preval test case

# function_expression_init.md

> Let scoping > Ai > Function expression init
>
> Test let scoping with function expression initializer

## Input

`````js filename=intro
let x = function() {};
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(1);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
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
let x = function $pcompiled() {};
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
let a = function $pcompiled() {
  debugger;
  return undefined;
};
const b = $( true );
if (b) {
  $( false );
}
const c = $( true );
if (c) {
  const d = $( true );
  if (d) {
    a = $( 1 );
  }
  const e = function() {
    debugger;
    return a;
  };
  $( e );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = function () {
  debugger;
  return undefined;
};
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
 - 1: true
 - 2: false
 - 3: true
 - 4: true
 - 5: 1
 - 6: '<function>'
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
