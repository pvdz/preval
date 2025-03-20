# Preval test case

# if_else_then_return.md

> One timers > Var > If else then return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  } else {
    $(2);
  }
  return $(3);
}
const x = f();
$(x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
const tmpReturnArg /*:unknown*/ = $(3);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
} else {
  $(2);
}
$($(3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
}
else {
  $( 2 );
}
const b = $( 3 );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
