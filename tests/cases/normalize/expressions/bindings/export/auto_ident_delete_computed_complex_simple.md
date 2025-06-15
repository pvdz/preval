# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident delete computed complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete $(arg)["y"];
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const a /*:boolean*/ = delete tmpDeleteObj.y;
export { a };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const a = delete tmpDeleteObj.y;
export { a };
$(a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
export { c as a };
$( c, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
const tmpDeleteObj = $(arg);
let a = delete tmpDeleteObj.y;
export { a };
$(a, arg);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
