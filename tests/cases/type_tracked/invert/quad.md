# Preval test case

# quad.md

> Type tracked > Invert > Quad
>
> A double bang should convert to a Boolean call because it's one statement vs two.

## Input

`````js filename=intro
$(!!!!$(1));
`````


## Settled


`````js filename=intro
const tmpUnaryArg$5 /*:unknown*/ = $(1);
const tmpUnaryArg$1 /*:boolean*/ = Boolean(tmpUnaryArg$5);
$(tmpUnaryArg$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
