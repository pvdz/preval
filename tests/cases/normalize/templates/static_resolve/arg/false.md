# Preval test case

# false.md

> Normalize > Templates > Static resolve > Arg > False
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${false}`);
`````

## Settled


`````js filename=intro
$(`false`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`false`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(false, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(false, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "false" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
