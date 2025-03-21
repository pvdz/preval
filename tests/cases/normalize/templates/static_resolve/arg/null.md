# Preval test case

# null.md

> Normalize > Templates > Static resolve > Arg > Null
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${null}`);
`````

## Settled


`````js filename=intro
$(`null`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`null`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(null, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(null, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "null" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'null'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
