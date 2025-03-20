# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident delete prop simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete arg.y;
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
export { a };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const a = delete arg.y;
export { a };
$(a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
export { b as a };
$( b, a );
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
