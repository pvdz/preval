# Preval test case

# string_slice.md

> Dot call > String slice
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const str = "worldy";
const tmpCallVal = str.slice;
const x = $dotCall(tmpCallVal, str, 'slice', 2, 4);
$(x);
`````

## Settled


`````js filename=intro
$(`rl`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`rl`);
`````

## Pre Normal


`````js filename=intro
const str = `worldy`;
const tmpCallVal = str.slice;
const x = $dotCall(tmpCallVal, str, `slice`, 2, 4);
$(x);
`````

## Normalized


`````js filename=intro
const str = `worldy`;
const x = str.slice(2, 4);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "rl" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'rl'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
