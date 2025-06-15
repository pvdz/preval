# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident computed complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

export let a = $(b)[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`c`);
const a /*:unknown*/ = tmpCompObj[tmpCalleeParam];
export { a };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
const a = tmpCompObj[tmpCalleeParam];
export { a };
$(a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
export { d as a };
$( d, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
let a = tmpCompObj[tmpCalleeParam];
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
