# Preval test case

# class_expr_named.md

> Normalize > Class > Class expr named
>
> Class expression base

## Input

`````js filename=intro
let a = class x {}
$(a, x);
`````


## Settled


`````js filename=intro
const a /*:class*/ /*truthy*/ = class x {};
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(class x {}, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class x  {

};
$( a, x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = class x {};
$(a, x);
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
