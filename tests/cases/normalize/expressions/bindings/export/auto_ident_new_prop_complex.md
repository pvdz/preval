# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident new prop complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

export let a = new ($(b).$)(1);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
const a /*:object*/ = new tmpNewCallee(1);
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $({ $: $ }).$;
const a = new tmpNewCallee(1);
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = new ($(b).$)(1);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
let a = new tmpNewCallee(1);
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = new c( 1 );
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
