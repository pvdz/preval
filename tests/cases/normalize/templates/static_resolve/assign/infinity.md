# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Assign > Infinity
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${Infinity}`;
$(x);
`````


## Settled


`````js filename=intro
$(`Infinity`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Infinity`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Infinity" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce($Number_POSITIVE_INFINITY, `string`);
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
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
