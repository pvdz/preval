# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = typeof arg;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = typeof arg);
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = typeof arg;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport /*:string*/ = `number`;
export { tmpAnonDefaultExport as default };
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "number";
export { a as default };
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
