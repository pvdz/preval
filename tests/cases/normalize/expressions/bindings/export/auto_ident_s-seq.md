# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

export let a = ($(1), $(2), x);
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const a /*:number*/ = 1;
export { a };
$(1, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const a = 1;
export { a };
$(1, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = 1;
export { a as a };
$( 1, 1 );
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
