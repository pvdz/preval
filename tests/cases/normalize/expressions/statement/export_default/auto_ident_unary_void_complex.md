# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default void $(100);
$(a);
`````

## Settled


`````js filename=intro
$(100);
const tmpAnonDefaultExport /*:undefined*/ = undefined;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = void $(100);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = undefined;
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
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
