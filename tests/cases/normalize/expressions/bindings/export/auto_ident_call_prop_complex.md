# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident call prop complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = $(b).$(1);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const a /*:unknown*/ = tmpCallObj.$(1);
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $({ $: $ }).$(1);
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = $(b).$(1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCallObj = $(b);
let a = tmpCallObj.$(1);
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
export { c as a };
$( c );
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
