# Preval test case

# opt_prop_nonopt_prop_pass.md

> Normalize > Optional > Opt prop nonopt prop pass
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {c: 100}};
$(a?.b.c);
`````


## Settled


`````js filename=intro
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
