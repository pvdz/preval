# Preval test case

# boolean_tdz.md

> Array > Static context > Boolean tdz
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(Boolean([crash_hard]));
`````

## Settled


`````js filename=intro
crash_hard;
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
crash_hard;
$(true);
`````

## Pre Normal


`````js filename=intro
$(Boolean([crash_hard]));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [crash_hard];
const tmpCalleeParam = Boolean(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
crash_hard;
$( true );
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
