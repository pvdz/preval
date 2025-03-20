# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Bindings > Export > Auto ident object empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = {};
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = {};
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
export { a as a };
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
