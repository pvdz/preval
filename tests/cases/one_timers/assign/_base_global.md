# Preval test case

# _base_global.md

> One timers > Assign > Base global
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  $(1);
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
$(1);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(1);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 1 );
$( undefined );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: undefined
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
