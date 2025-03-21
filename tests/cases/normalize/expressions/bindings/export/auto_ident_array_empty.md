# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Bindings > Export > Auto ident array empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = [];
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ = [];
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [];
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
export { a as a };
$( a );
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
