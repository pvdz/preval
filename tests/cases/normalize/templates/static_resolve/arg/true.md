# Preval test case

# true.md

> Normalize > Templates > Static resolve > Arg > True
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${true}`);
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

## Pre Normal


`````js filename=intro
$(`` + $coerce(true, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(true, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "true" );
`````

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
