# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident prop complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

export let a = $(b).c;
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const a /*:unknown*/ = tmpCompObj.c;
export { a };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const a = $(b).c;
export { a };
$(a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
export { c as a };
$( c, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
let a = tmpCompObj.c;
export { a };
$(a, b);
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
