# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = $(b);
$(a, b);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const tmpAnonDefaultExport /*:unknown*/ = a;
export { tmpAnonDefaultExport as default };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = $(b));
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = $(b);
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a;
export { b as default };
$( a, 1 );
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
