# Preval test case

# opt_prop_nonopt_prop_undef_a.md

> Normalize > Optional > Opt prop nonopt prop undef a
>
> Make sure this works properly

## Input

`````js filename=intro
const a = undefined;
$(a?.b.c);
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
