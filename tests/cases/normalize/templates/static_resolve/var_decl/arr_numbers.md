# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Var decl > Arr numbers
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${[1,2,3]}`;
$(x);
`````


## Settled


`````js filename=intro
$(`1,2,3`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1,2,3`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1,2,3" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
let tmpCalleeParam = [1, 2, 3];
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
