# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Statement > Infinity
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${Infinity}`;
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce($Number_POSITIVE_INFINITY, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
`````


## Todos triggered


- (todo) Support coercing "$Number_POSITIVE_INFINITY" to a "string"


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
