# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default new ($($))(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = new ($($))(1);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpAnonDefaultExport = new tmpNewCallee(1);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpNewCallee = $($);
const tmpAnonDefaultExport = new tmpNewCallee(1);
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
export { b as default };
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
