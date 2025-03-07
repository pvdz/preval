# Preval test case

# null.md

> Normalize > Templates > Static resolve > Assign > Null
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = undefined;
x = `${null}`;
$(x);
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
let x = undefined;
x = `` + $coerce(null, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(null, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
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
