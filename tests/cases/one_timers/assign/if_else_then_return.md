# Preval test case

# if_else_then_return.md

> One timers > Assign > If else then return
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
    $(1);
  } else {
    $(2);
  }
  return $(3);
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
  $(1);
} else {
  $(2);
}
const tmpReturnArg /*:unknown*/ = $(3);
$(tmpReturnArg);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
if ($()) {
  $(1);
} else {
  $(2);
}
const tmpReturnArg = $(3);
$(tmpReturnArg);
$(tmpReturnArg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $();
if (b) {
  $( 1 );
}
else {
  $( 2 );
}
const c = $( 3 );
$( c );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
 - 4: 2
 - 5: 3
 - 6: 3
 - 7: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
