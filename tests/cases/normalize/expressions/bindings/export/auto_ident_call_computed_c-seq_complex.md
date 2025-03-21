# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident call computed c-seq complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = (1, 2, $(b))[$("$")](1);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallCompObj /*:unknown*/ = $(b);
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const a /*:unknown*/ = tmpCallCompObj[tmpCallCompProp](1);
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompObj = $({ $: $ });
const tmpCallCompProp = $(`\$`);
const a = tmpCallCompObj[tmpCallCompProp](1);
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = (1, 2, $(b))[$(`\$`)](1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
let a = tmpCallCompObj[tmpCallCompProp](1);
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ]( 1 );
export { d as a };
$( d );
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
