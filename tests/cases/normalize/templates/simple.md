# Preval test case

# simple.md

> Normalize > Templates > Simple
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ $(1) } def`);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `abc ${tmpBinBothRhs} def`;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc ${$(1)} def`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `abc ${b} def`;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'abc 1 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
