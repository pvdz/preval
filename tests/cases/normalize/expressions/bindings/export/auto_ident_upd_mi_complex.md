# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident upd mi complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

export let a = --$($(b)).x;
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
const a /*:unknown*/ = tmpUpdInc;
export { a };
$(tmpUpdInc, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
tmpUpdObj.x = tmpUpdInc;
const a = tmpUpdInc;
export { a };
$(tmpUpdInc, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = --$($(b)).x;
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
const tmpCalleeParam = $(b);
let tmpUpdObj = $(tmpCalleeParam);
let tmpUpdProp = tmpUpdObj.x;
let tmpUpdNum = $coerce(tmpUpdProp, `number`);
let tmpUpdInc = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
let a = tmpUpdInc;
export { a };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e - 1;
c.x = f;
const g = f;
export { g as a };
$( f, a );
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
