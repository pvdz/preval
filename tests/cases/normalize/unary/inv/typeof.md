# Preval test case

# typeof.md

> Normalize > Unary > Inv > Typeof
>
> Typeof always returns a non-empty string so inverting it is always `false`

## Input

`````js filename=intro
$(!typeof $(100));
`````


## Settled


`````js filename=intro
$(100);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( false );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
