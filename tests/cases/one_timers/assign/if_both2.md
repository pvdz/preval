# Preval test case

# if_both2.md

> One timers > Assign > If both2
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
let x = $(100);
const tmpCalleeParam = x;
$(tmpCalleeParam);
const g = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('a');
    g(); // Recursion
  } else {
    $('b');
  }
};
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $('c');
  x = undefined;
} else {
  x = undefined;
}
x = f();
$(x);
const tmpCalleeParam$1 = x;
$(tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
const g /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    $(`a`);
    g();
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  $(`c`);
} else {
}
const tmpClusterSSA_x /*:unknown*/ = f();
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
const g = function () {
  if ($(1)) {
    $(`a`);
    g();
  } else {
    $(`b`);
  }
};
if ($(1)) {
  $(`c`);
}
const tmpClusterSSA_x = f();
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = function() {
  debugger;
  const c = $( 1 );
  if (c) {
    $( "a" );
    b();
    return undefined;
  }
  else {
    $( "b" );
    return undefined;
  }
};
const d = $( 1 );
if (d) {
  $( "c" );
}
const e = f();
$( e );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(100);
const tmpCalleeParam = x;
$(x);
const g = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(`a`);
    g();
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(`c`);
  x = undefined;
} else {
  x = undefined;
}
x = f();
$(x);
const tmpCalleeParam$1 = x;
$(x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

f


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'c'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
