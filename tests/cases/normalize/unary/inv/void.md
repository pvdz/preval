# Preval test case

# void.md

> Normalize > Unary > Inv > Void
>
> Typeof always returns a non-empty string so inverting it is always `false`

## Input

`````js filename=intro
$(!void $(100));
`````


## Settled


`````js filename=intro
$(100);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( true );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
