# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Statement > Template complex
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${`a ${$(1)} b`}`;
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
$coerce(tmpCalleeParam$1, `string`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(1), `string`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$coerce( a, "string" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
