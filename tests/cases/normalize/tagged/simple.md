# Preval test case

# simple.md

> Normalize > Tagged > Simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$`abc ${ $(1) } def`;
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ = [`abc `, ` def`];
$(tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
$([`abc `, ` def`], tmpCalleeParam$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "abc ", " def" ];
$( b, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['abc ', ' def'], 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
