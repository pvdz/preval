# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond s-seq s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = (10, 20, 30) ? (40, 50, 60) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:number*/ = 60;
export { a };
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 60;
export { a };
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 60;
export { a as a };
$( 60 );
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
