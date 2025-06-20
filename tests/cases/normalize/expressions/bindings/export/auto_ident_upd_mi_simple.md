# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident upd mi simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

export let a = --b;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpSSA_b /*:number*/ /*falsy*/ = 0;
export { tmpSSA_b as a };
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_b = 0;
export { tmpSSA_b as a };
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0;
export { a as a };
$( 0, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
let a = b;
export { a };
$(a, b);
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
