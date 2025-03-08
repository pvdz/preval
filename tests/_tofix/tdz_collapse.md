# Preval test case

# tdz_collapse.md

> Tofix > tdz collapse
>
> We should collapse TDZ ident statements when we can see the next statement will test it too
> (There are cases where this doesn't happen...)

## Input

`````js filename=intro
TDZ
const x = TDZ + $; // This will always first evaluate TDZ
$(x);
`````

## Settled


`````js filename=intro
const x /*:primitive*/ = TDZ + $;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(TDZ + $);
`````

## Pre Normal


`````js filename=intro
TDZ;
const x = TDZ + $;
$(x);
`````

## Normalized


`````js filename=intro
const x = TDZ + $;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = TDZ + $;
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

TDZ

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
