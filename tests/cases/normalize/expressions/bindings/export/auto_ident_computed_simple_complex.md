# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

export let a = b[$("c")];
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const a /*:unknown*/ = b[tmpCompProp];
export { a };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const a = b[tmpCompProp];
export { a };
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = b[$(`c`)];
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
let a = tmpCompObj[tmpCompProp];
export { a };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
export { c as a };
$( c, b );
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
