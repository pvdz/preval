# Preval test case

# regex.md

> Minus unary > Regex
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-/1/);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:regex*/ = new $regex_constructor(`1`, ``);
const tmpCalleeParam /*:number*/ = -tmpUnaryArg;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = new $regex_constructor(`1`, ``);
$(-tmpUnaryArg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "1", "" );
const b = -a;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = new $regex_constructor(`1`, ``);
let tmpCalleeParam = -tmpUnaryArg;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
