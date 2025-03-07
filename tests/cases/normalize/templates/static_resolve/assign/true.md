# Preval test case

# true.md

> Normalize > Templates > Static resolve > Assign > True
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${true}`;
$(x);
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
let x = undefined;
x = `` + $coerce(true, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(true, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
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
