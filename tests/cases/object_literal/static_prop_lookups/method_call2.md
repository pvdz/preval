# Preval test case

# method_call2.md

> Object literal > Static prop lookups > Method call2
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: $(1)};
$(o.x());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpObjLitVal, o, `x`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
$($dotCall(tmpObjLitVal, { x: tmpObjLitVal }, `x`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: a };
const c = $dotCall( a, b, "x" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const tmpMCF = o.x;
let tmpCalleeParam = $dotCall(tmpMCF, o, `x`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
