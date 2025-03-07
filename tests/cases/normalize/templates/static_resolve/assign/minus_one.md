# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Assign > Minus one
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${-1}`;
$(x);
`````

## Settled


`````js filename=intro
$(`-1`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`-1`);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = `` + $coerce(-1, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(-1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "-1" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
