# Preval test case

# false.md

> Normalize > Templates > Static resolve > Var decl > False
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
let x = `${false}`;
$(x);
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
let x = `` + $coerce(false, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(false, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let x = $coerce(tmpBinLhs, `plustr`);
$(x);
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
