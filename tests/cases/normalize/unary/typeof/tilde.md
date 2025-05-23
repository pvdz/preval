# Preval test case

# tilde.md

> Normalize > Unary > Typeof > Tilde
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof ~$(100));
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
+tmpUnaryArg;
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
+tmpUnaryArg;
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
+a;
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $(100);
+tmpUnaryArg;
let tmpCalleeParam = `number`;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
