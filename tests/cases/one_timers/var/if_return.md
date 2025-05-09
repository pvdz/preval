# Preval test case

# if_return.md

> One timers > Var > If return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    return $(1);
  }
}
const x = f();
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  const x /*:unknown*/ = $(1);
  $(x);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $($(1));
} else {
  $(undefined);
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
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
