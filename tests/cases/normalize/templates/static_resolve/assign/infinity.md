# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Assign > Infinity
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${Infinity}`;
$(x);
`````

## Settled


`````js filename=intro
$(`Infinity`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Infinity`);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = `` + $coerce(Infinity, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(Infinity, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "Infinity" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Infinity'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
