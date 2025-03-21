# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Var decl > Nan
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${NaN}`;
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

## Pre Normal


`````js filename=intro
let x = `` + $coerce(NaN, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(NaN, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "NaN" );
`````

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
