# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
export default a = b["c"];
$(a, b);
`````

## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 1;
export { tmpAnonDefaultExport as default };
const b /*:object*/ = { c: 1 };
$(1, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 1;
export { tmpAnonDefaultExport as default };
$(1, { c: 1 });
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = b[`c`]);
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
a = b.c;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1;
export { a as default };
const b = { c: 1 };
$( 1, b );
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
