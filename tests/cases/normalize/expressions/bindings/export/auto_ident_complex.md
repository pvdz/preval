# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

export let a = $(b);
$(a, b);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
export { a };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
export { a };
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
export { a as a };
$( a, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = $(b);
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
