# Preval test case

# _base_prop_undef.md

> Normalize > Nullish > Base prop undef
>
> Simple example

## Input

`````js filename=intro
var f = undefined;
$(f??x);
`````


## Settled


`````js filename=intro
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
$( x );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
