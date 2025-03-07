# Preval test case

# infinity_tostring.md

> Dot call > Infinity tostring
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const inf = Infinity;
const tmpCallVal = inf.toString;
const x = $dotCall(tmpCallVal, inf, 'toString');
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
const inf = Infinity;
const tmpCallVal = inf.toString;
const x = $dotCall(tmpCallVal, inf, `toString`);
$(x);
`````

## Normalized


`````js filename=intro
const inf = Infinity;
const x = inf.toString();
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
