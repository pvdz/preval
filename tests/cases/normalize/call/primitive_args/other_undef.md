# Preval test case

# other_undef.md

> Normalize > Call > Primitive args > Other undef
>
> Primitive args that may need to be simplified

## Input

`````js filename=intro
$(+undefined);
$(~undefined);
$(typeof undefined);
$(void undefined);
`````


## Settled


`````js filename=intro
$($Number_NaN);
$(-1);
$(`undefined`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
$(-1);
$(`undefined`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
$( -1 );
$( "undefined" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = NaN;
$($Number_NaN);
let tmpCalleeParam$1 = -1;
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = `undefined`;
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = undefined;
$(undefined);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: -1
 - 3: 'undefined'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
