# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default ++b;
$(a, b);
`````

## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 2;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 2;
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 }, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ++b;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
const tmpAnonDefaultExport = b;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
$( b, 2 );
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
