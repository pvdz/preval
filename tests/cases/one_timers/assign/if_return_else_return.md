# Preval test case

# if_return_else_return.md

> One timers > Assign > If return else return
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
    return $(1);
  } else {
    return $(2);
  }
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
  const tmpClusterSSA_x /*:unknown*/ = $(1);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(2);
  $(tmpClusterSSA_x$1);
  $(tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
if ($()) {
  const tmpClusterSSA_x = $(1);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 = $(2);
  $(tmpClusterSSA_x$1);
  $(tmpClusterSSA_x$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $();
if (b) {
  const c = $( 1 );
  $( c );
  $( c );
}
else {
  const d = $( 2 );
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
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
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
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
