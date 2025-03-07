# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = !arg;
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:boolean*/ = false;
export { tmpAnonDefaultExport as default };
$(false, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = false;
export { tmpAnonDefaultExport as default };
$(false, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = !arg);
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = !arg;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = false;
export { a as default };
$( false, 1 );
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
