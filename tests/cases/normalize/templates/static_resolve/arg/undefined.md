# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Arg > Undefined
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${undefined}`);
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

## Pre Normal


`````js filename=intro
$(`` + $coerce(undefined, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(undefined, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "undefined" );
`````

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
