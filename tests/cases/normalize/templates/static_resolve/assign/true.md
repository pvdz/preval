# Preval test case

# true.md

> Normalize > Templates > Static resolve > Assign > True
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${true}`;
$(x);
`````


## Settled


`````js filename=intro
$(`true`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`true`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "true" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(true, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'true'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
