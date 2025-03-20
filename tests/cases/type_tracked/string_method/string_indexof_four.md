# Preval test case

# string_indexof_four.md

> Type tracked > String method > String indexof four
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf('l', 1, $, unknown));
`````


## Settled


`````js filename=intro
unknown;
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
$( 2 );
`````


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
