# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = { x: 1, y: 2, z: 3 };
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = { x: 1, y: 2, z: 3 };
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
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
