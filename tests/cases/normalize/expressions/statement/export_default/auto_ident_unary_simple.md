# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default typeof x;
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = typeof x;
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = typeof x;
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport /*:string*/ = `number`;
export { tmpAnonDefaultExport as default };
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "number";
export { a as default };
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
