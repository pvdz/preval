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
  const tmpReturnArg$1 /*:unknown*/ = $(2);
  $(tmpReturnArg$1);
} else {
  const tmpReturnArg /*:unknown*/ = $(1);
  $(tmpReturnArg);
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
