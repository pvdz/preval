# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Assign > Arr holes
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${[1,,3]}`;
$(x);
`````


## Settled


`````js filename=intro
$(`1,,3`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1,,3`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1,,3" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
let tmpCalleeParam = [1, , 3];
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
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
 - 1: '1,,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
