# Preval test case

# float_tostring.md

> Dot call > Float tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const flt = 3.48;
const tmpCallVal = flt.toString;
const x = $dotCall(tmpCallVal, flt, 'toString');
$(x);
`````

## Settled


`````js filename=intro
$(`3.48`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`3.48`);
`````

## Pre Normal


`````js filename=intro
const flt = 3.48;
const tmpCallVal = flt.toString;
const x = $dotCall(tmpCallVal, flt, `toString`);
$(x);
`````

## Normalized


`````js filename=intro
const flt = 3.48;
const x = flt.toString();
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "3.48" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '3.48'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
