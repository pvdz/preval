# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident call computed s-seq complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = (1, 2, b)[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const a /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
const a = b[tmpMCCP](1);
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
export { d as a };
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
const tmpMCCO = b;
const tmpMCCP = $(`\$`);
const tmpMCF = tmpMCCO[tmpMCCP];
let a = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
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
