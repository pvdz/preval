# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Assign > Nan
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${NaN}`;
$(x);
`````


## Settled


`````js filename=intro
$(`NaN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`NaN`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "NaN" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce($Number_NaN, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````


## Todos triggered


- (todo) Support coercing "$Number_NaN" to a "string"


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
