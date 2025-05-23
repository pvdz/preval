# Preval test case

# implicit_global_method.md

> Object literal > Static prop lookups > Implicit global method
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  // Cannot inline this because we don't know if the implicit global cares about `this`
  f: $,
};
$(o.f("200", 15));
`````


## Settled


`````js filename=intro
const o /*:object*/ = { f: $ };
const tmpCalleeParam /*:unknown*/ = $dotCall($, o, `f`, `200`, 15);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($, { f: $ }, `f`, `200`, 15));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { f: $ };
const b = $dotCall( $, a, "f", "200", 15 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const o = { f: $ };
const tmpMCF = o.f;
let tmpCalleeParam = $dotCall(tmpMCF, o, `f`, `200`, 15);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '200', 15
 - 2: '200'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
