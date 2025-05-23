# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Var decl > Undefined
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${undefined}`;
$(x);
`````


## Settled


`````js filename=intro
$(`undefined`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`undefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "undefined" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(undefined, `string`);
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
 - 1: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
