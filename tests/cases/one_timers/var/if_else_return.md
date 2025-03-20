# Preval test case

# if_else_return.md

> One timers > Var > If else return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
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
  $(1);
  $(undefined);
} else {
  const tmpReturnArg /*:unknown*/ = $(2);
  $(tmpReturnArg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
  $(undefined);
} else {
  $($(2));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  $( undefined );
}
else {
  const b = $( 2 );
  $( b );
}
`````


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
