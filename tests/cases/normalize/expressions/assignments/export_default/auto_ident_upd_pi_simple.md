# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = ++b;
$(a, b);
`````

## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 2;
export { tmpAnonDefaultExport as default };
$(2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 2;
export { tmpAnonDefaultExport as default };
$(2, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = ++b);
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = b;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as default };
$( 2, 2 );
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
