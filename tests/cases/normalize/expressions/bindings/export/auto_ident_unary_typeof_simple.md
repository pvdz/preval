# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary typeof simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

export let a = typeof arg;
$(a, arg);
`````


## Settled


`````js filename=intro
const a /*:string*/ /*truthy*/ = `number`;
export { a };
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = `number`;
export { a };
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "number";
export { a as a };
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = typeof arg;
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
