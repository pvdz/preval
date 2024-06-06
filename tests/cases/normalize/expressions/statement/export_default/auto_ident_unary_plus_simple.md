# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident unary plus simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default +arg;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = +arg;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = +arg;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport = 1;
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1;
export { a as default from "undefined"
const b = {
a: 999,
b: 1000
;
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
