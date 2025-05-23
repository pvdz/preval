# Preval test case

# string_checked.md

> Normalize > Templates > Static resolve > Statement > String checked
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${"why"}`);
`````


## Settled


`````js filename=intro
$(`why`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`why`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "why" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`why`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'why'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
