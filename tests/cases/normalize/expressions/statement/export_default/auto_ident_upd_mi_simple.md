# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default --b;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = --b;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let tmpAnonDefaultExport = b;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 0;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0;
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
$( b, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
