# Preval test case

# parseint_method.md

> Object literal > Static prop lookups > Parseint method
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  f: parseInt,
};
$(o.f("200", 15));
`````


## Settled


`````js filename=intro
const o /*:object*/ = { f: parseInt };
const tmpCalleeParam /*:unknown*/ = o.f(`200`, 15);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ f: parseInt }.f(`200`, 15));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { f: parseInt };
const b = a.f( "200", 15 );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 450
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
