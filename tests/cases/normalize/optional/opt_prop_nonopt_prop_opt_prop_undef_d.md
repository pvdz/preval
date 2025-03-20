# Preval test case

# opt_prop_nonopt_prop_opt_prop_undef_d.md

> Normalize > Optional > Opt prop nonopt prop opt prop undef d
>
> Make sure this works properly

## Input

`````js filename=intro
const a = {b: {c: {}}};
$(a?.b.c?.d);
`````


## Settled


`````js filename=intro
const tmpChainElementObject$3 /*:unknown*/ = $Object_prototype.d;
$(tmpChainElementObject$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Object_prototype.d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.d;
$( a );
`````


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
