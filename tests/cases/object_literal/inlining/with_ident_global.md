# Preval test case

# with_ident_global.md

> Object literal > Inlining > With ident global
>
>

## Input

`````js filename=intro
const obj = {f: wat};
$(obj.f);
`````


## Settled


`````js filename=intro
$(wat);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(wat);
`````


## PST Settled
With rename=true

`````js filename=intro
$( wat );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

wat


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
