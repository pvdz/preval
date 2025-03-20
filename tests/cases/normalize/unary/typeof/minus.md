# Preval test case

# minus.md

> Normalize > Unary > Typeof > Minus
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof -$(100));
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
-tmpUnaryArg;
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
-tmpUnaryArg;
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
-a;
$( "number" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
