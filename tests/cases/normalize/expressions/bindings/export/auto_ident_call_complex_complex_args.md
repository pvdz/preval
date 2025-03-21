# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Bindings > Export > Auto ident call complex complex args
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = $($)($(1), $(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:unknown*/ = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = $($);
const a = tmpCallCallee($(1), $(2));
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
export { d as a };
$( d );
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
