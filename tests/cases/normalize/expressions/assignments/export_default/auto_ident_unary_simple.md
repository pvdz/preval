# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default a = typeof x;
$(a, x);
`````

## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:string*/ = `number`;
export { tmpAnonDefaultExport as default };
$(`number`, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = `number`;
export { tmpAnonDefaultExport as default };
$(`number`, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = typeof x);
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "number";
export { a as default };
$( "number", 1 );
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
