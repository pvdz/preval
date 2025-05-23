# Preval test case

# var_export_named_multi.md

> Normalize > Hoisting > Base > Var export named multi
>
> Exported var bindings are still hoisted

## Input

`````js filename=intro
$(x, y);
export var x = 10, y = 20;
$(x, y);
`````


## Settled


`````js filename=intro
$(undefined, undefined);
$(10, 20);
const x /*:number*/ = 10;
export { x };
const y /*:number*/ = 20;
export { y };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
$(10, 20);
const x = 10;
export { x };
const y = 20;
export { y };
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
$( 10, 20 );
const a = 10;
export { a as x };
const b = 20;
export { b as y };
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
