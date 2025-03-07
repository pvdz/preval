# Preval test case

# string.md

> Normalize > Templates > Static resolve > Arg > String
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${"why"}`);
`````

## Settled


`````js filename=intro
$(`why`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`why`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(`why`, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`why`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "why" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'why'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
