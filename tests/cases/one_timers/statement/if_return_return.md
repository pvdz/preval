# Preval test case

# if_return_return.md

> One timers > Statement > If return return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  }
  $(2);
}
f();
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
  $(2);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
  $(2);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  $( 2 );
}
else {
  $( 2 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
