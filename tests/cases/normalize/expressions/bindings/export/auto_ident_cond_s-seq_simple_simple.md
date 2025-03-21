# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond s-seq simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = (10, 20, 30) ? $(2) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2);
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
export { a as a };
$( a );
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
