# Preval test case

# double.md

> Type tracked > Invert > Double
>
> A double bang should convert to a Boolean call because it's one statement vs two.

## Input

`````js filename=intro
$(!!$(1));
`````


## Settled


`````js filename=intro
const tmpUnaryArg$1 /*:unknown*/ = $(1);
const tmpCalleeParam /*:boolean*/ = $boolean_constructor(tmpUnaryArg$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $boolean_constructor( a );
$( b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
