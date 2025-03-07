# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident call prop simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = b.$(1);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b.$(1);
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = { $: $ }.$(1);
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = b.$(1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = b.$(1);
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
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
