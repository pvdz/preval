# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

export let a = typeof x;
$(a, x);
`````


## Settled


`````js filename=intro
const a /*:string*/ = `number`;
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
