# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Bindings > Export > Auto ident new ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = new $(1);
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = new $(1);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
export { a as a };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = new $(1);
export { a };
$(a);
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
