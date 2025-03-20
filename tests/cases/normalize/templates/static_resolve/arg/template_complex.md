# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Arg > Template complex
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${`a ${$(1)} b`}`);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:string*/ = $coerce(tmpCalleeParam$3, `string`);
const tmpCalleeParam$1 /*:string*/ = `a ${tmpBinBothRhs$1} b`;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a ${$(1)} b`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `a ${b} b`;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'a 1 b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
