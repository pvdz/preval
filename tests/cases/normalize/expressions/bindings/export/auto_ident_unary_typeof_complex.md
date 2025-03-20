# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary typeof complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

export let a = typeof $(arg);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
export { a };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
export { a };
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
export { b as a };
$( b, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
