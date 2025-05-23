# Preval test case

# if_else_return_return.md

> One timers > Var > If else return return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
}
const x = f();
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(0);
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(1);
  $(tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(0);
  $($(2));
} else {
  $($(1));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 0 );
  const b = $( 2 );
  $( b );
}
else {
  const c = $( 1 );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
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
const x = f();
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
