# Preval test case

# string_nan.md

> Normalize > Builtins > Globals with primitives > String nan
>
> Calling String on a primitive should resolve

## Input

`````js filename=intro
$(String(NaN));
`````


## Settled


`````js filename=intro
$(`NaN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`NaN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "NaN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $coerce($Number_NaN, `string`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Support coercing "$Number_NaN" to a "string"


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
