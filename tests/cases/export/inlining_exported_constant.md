# Preval test case

# inlining_exported_constant.md

> Export > Inlining exported constant
>
> The constant is redundant but is exported. We need to properly handle that.

## Input

`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = a;
export { b };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a;
export { b as b };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
