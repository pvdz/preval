# Preval test case

# _base_computed_obj.md

> Normalize > Optional > Base computed obj
>
> Simple example

## Input

`````js filename=intro
var f = {10: 20};
var x = 10;
$(f?.[x]);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_f /*:object*/ = { [10]: 20 };
const tmpChainElementObject /*:unknown*/ = tmpClusterSSA_f[10];
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [10]: 20 }[10]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ 10 ]: 20 };
const b = a[ 10 ];
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
