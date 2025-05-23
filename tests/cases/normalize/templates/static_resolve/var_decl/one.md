# Preval test case

# one.md

> Normalize > Templates > Static resolve > Var decl > One
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${1}`;
$(x);
`````


## Settled


`````js filename=intro
$(`1`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(1, `string`);
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
 - 1: '1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
