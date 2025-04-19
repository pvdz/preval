# Preval test case

# arr_mutation_hard_nan.md

> Arr mutation > Arr mutation hard nan
>
> There was a bug in arr_mutation where it would replace the
> initial `[0]` with `[d]`, introducing a TDZ throw.
> But in this case, especially with a back-to-back def and update, 
> we should still be able to do it. Just have to make sure we don't introduce
> another bug in arr_mutation

## Input

`````js filename=intro
let a = [0];
const d = $();
a[NaN] = d;
$(a);
`````


## Settled


`````js filename=intro
const d /*:unknown*/ = $();
const a /*:array*/ = [0];
a[NaN] = d;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const d = $();
const a = [0];
a[NaN] = d;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = [ 0 ];
b[NaN] = a;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: [0]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
