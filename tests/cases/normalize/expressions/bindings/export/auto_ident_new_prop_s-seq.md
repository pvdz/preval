# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident new prop s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = new (1, 2, b).$(1);
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
export { a as a };
$( a );
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
