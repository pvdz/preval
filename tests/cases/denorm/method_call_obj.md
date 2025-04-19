# Preval test case

# method_call_obj.md

> Denorm > Method call obj
>
>

## Input

`````js filename=intro
const tmpCallCompObj$23 = document.body;
tmpCallCompObj$23.removeChild(s);
`````


## Settled


`````js filename=intro
const tmpCallCompObj$23 /*:unknown*/ = document.body;
const tmpMCF /*:unknown*/ = tmpCallCompObj$23.removeChild;
$dotCall(tmpMCF, tmpCallCompObj$23, `removeChild`, s);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompObj$23 = document.body;
tmpCallCompObj$23.removeChild(s);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = document.body;
const b = a.removeChild;
$dotCall( b, a, "removeChild", s );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

s


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
