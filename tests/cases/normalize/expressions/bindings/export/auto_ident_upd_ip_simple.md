# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident upd ip simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

export let a = b++;
$(a, b);
`````


## Settled


`````js filename=intro
const a /*:number*/ = 1;
export { a };
$(1, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 1;
export { a };
$(1, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1;
export { a as a };
$( 1, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
let a = tmpPostUpdArgIdent;
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
