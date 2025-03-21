# Preval test case

# base.md

> Aliasing globals > Base
>
> Common artifact for normalization is to put all idents in a temp constant to make sure they don't mutate.

## Input

`````js filename=intro
const a = unknown1;
const b = unknown2;
const c = unknown3;
$(a, b, c);
`````


## Settled


`````js filename=intro
$(unknown1, unknown2, unknown3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(unknown1, unknown2, unknown3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( unknown1, unknown2, unknown3 );
`````


## Todos triggered


None


## Globals


BAD@! Found 3 implicit global bindings:

unknown1, unknown2, unknown3


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
