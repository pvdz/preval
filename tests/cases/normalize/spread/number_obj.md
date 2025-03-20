# Preval test case

# number_obj.md

> Normalize > Spread > Number obj
>
> Spread on number is an error

## Input

`````js filename=intro
const x = 100;
$({...x});
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
