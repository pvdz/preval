# Preval test case

# member.md

> Normalize > Unary > Tilde > Member
>
> Negative builtins should be statically resolved where possible

## Input

`````js filename=intro
$(~Date.length);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:number*/ = Date.length;
const tmpCalleeParam /*:number*/ = ~tmpUnaryArg;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = Date.length;
$(~tmpUnaryArg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Date.length;
const b = ~a;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = Date.length;
let tmpCalleeParam = ~tmpUnaryArg;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
