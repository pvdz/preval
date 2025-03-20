# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Bindings > Export > Auto ident literal
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = "foo";
$(a);
`````


## Settled


`````js filename=intro
const a /*:string*/ = `foo`;
export { a };
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = `foo`;
export { a };
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "foo";
export { a as a };
$( "foo" );
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
