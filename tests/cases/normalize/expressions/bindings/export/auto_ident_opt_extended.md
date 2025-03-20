# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Bindings > Export > Auto ident opt extended
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

export let a = b?.x.y.z;
$(a);
`````


## Settled


`````js filename=intro
const a /*:number*/ = 100;
export { a };
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 100;
export { a };
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 100;
export { a as a };
$( 100 );
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
