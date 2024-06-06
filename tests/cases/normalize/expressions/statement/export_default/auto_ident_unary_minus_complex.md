# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident unary minus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default -$(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = -$(100);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpAnonDefaultExport = -tmpUnaryArg;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
const tmpAnonDefaultExport = -tmpUnaryArg;
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
export { b as default from "undefined"
const c = {
a: 999,
b: 1000
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
