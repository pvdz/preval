# Preval test case

# if_else_return_return.md

> One timers > Assign > If else return return
>
> Return inlining

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(0);
  const tmpClusterSSA_x$1 /*:unknown*/ = $(2);
  $(tmpClusterSSA_x$1);
  $(tmpClusterSSA_x$1);
} else {
  const tmpClusterSSA_x$3 /*:unknown*/ = $(1);
  $(tmpClusterSSA_x$3);
  $(tmpClusterSSA_x$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
if ($()) {
  $(0);
  const tmpClusterSSA_x$1 = $(2);
  $(tmpClusterSSA_x$1);
  $(tmpClusterSSA_x$1);
} else {
  const tmpClusterSSA_x$3 = $(1);
  $(tmpClusterSSA_x$3);
  $(tmpClusterSSA_x$3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $();
if (b) {
  $( 0 );
  const c = $( 2 );
  $( c );
  $( c );
}
else {
  const d = $( 1 );
  $( d );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(0);
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
let x = $(100);
let tmpCalleeParam = closure();
$(tmpCalleeParam);
x = f();
$(x);
let tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
