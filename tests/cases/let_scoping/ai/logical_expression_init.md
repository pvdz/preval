# Preval test case

# logical_expression_init.md

> Let scoping > Ai > Logical expression init
>
> Test let scoping with logical expression initializer

## Input

`````js filename=intro
let x = $(0) || $(1);
if ($(true)) { $(false); } else {}
if ($(true)) {
  if ($(true)) x = $(2);
  $(() => x);
  $(x);
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(0);
if (x) {
} else {
  x = $(1);
}
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
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(0);
if (!x) {
  x = $(1);
}
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
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 0 );
if (a) {

}
else {
  a = $( 1 );
}
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
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(0);
if (x) {
} else {
  x = $(1);
}
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
 - 2: 1
 - 3: true
 - 4: false
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
