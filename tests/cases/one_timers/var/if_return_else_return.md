# Preval test case

# if_return_else_return.md

> One timers > Var > If return else return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    return $(1);
  } else {
    return $(2);
  }
}
const x = f();
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(1);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(2);
  $(tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $($(1));
} else {
  $($(2));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  const b = $( 1 );
  $( b );
}
else {
  const c = $( 2 );
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
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
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
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
