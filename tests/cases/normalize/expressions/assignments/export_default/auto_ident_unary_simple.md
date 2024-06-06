# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default a = typeof x;
$(a, x);
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

## Output


`````js filename=intro
const tmpAnonDefaultExport = `number`;
export { tmpAnonDefaultExport as default };
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "number";
export { a as default from "undefined"
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
