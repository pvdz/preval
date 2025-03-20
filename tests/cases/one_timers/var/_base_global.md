# Preval test case

# _base_global.md

> One timers > Var > Base global
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  $(1);
}
const x = f();
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
