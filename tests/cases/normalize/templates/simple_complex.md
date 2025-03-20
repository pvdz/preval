# Preval test case

# simple_complex.md

> Normalize > Templates > Simple complex
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ 10 } ${ $(20) } def`);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(20);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `abc 10 ${tmpBinBothRhs} def`;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc 10 ${$(20)} def`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 20 );
const b = $coerce( a, "string" );
const c = `abc 10 ${b} def`;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - 2: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
