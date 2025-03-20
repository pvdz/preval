# Preval test case

# quint.md

> Type tracked > Invert > Quint
>
> A double bang should convert to a Boolean call because it's one statement vs two.

## Input

`````js filename=intro
$(!!!!!$(1));
`````


## Settled


`````js filename=intro
const tmpUnaryArg$7 /*:unknown*/ = $(1);
const tmpUnaryArg$3 /*:boolean*/ = Boolean(tmpUnaryArg$7);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg$3;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg$3 = Boolean($(1));
$(!tmpUnaryArg$3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
const c = !b;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
