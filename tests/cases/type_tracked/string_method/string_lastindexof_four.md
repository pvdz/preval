# Preval test case

# string_lastindexof_four.md

> Type tracked > String method > String lastindexof four
>
> String lastIndexOf should fully resolve

## Input

`````js filename=intro
$('hello'.lastIndexOf('e', 4, $, unknown));
`````


## Settled


`````js filename=intro
unknown;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
$( 1 );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
