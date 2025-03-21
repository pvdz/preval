# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

export let a = b["c"];
$(a, b);
`````


## Settled


`````js filename=intro
const a /*:number*/ = 1;
export { a };
const b /*:object*/ = { c: 1 };
$(1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 1;
export { a };
$(1, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1;
export { a as a };
const b = { c: 1 };
$( 1, b );
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
