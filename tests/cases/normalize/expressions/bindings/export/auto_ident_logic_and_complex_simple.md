# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident logic and complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = $($(1)) && 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  a = 2;
} else {
}
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = 2;
}
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  b = 2;
}
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
