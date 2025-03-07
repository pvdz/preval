# Preval test case

# typeof_tdz.md

> Array > Static context > Typeof tdz
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(typeof [crash_hard]);
`````

## Settled


`````js filename=intro
crash_hard;
$(`object`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
crash_hard;
$(`object`);
`````

## Pre Normal


`````js filename=intro
$(typeof [crash_hard]);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = [crash_hard];
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
crash_hard;
$( "object" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

crash_hard

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
