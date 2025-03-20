# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Bindings > Export > Auto ident ident ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

export let a = (b = 2);
$(a, b, c);
`````


## Settled


`````js filename=intro
const a /*:number*/ = 2;
export { a };
$(2, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 2;
export { a };
$(2, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as a };
$( 2, 2, 2 );
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
