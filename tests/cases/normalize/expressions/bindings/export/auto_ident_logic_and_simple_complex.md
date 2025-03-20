# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident logic and simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = 1 && $($(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
export { b as a };
$( b );
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
