# Preval test case

# string_concat_expr.md

> Property lookup > String concat expr

## Input

`````js filename=intro
const x = $String_prototype.lastIndexOf;
$( x );
`````


## Settled


`````js filename=intro
$($string_lastIndexOf);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($string_lastIndexOf);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $string_lastIndexOf );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
