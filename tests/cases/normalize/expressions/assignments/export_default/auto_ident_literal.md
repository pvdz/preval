# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Export default > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = "foo";
$(a);
`````


## Settled


`````js filename=intro
const a /*:string*/ /*truthy*/ = `foo`;
export { a as default };
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = `foo`;
export { a as default };
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "foo";
export { a as default };
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
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
