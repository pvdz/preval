# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Assignments > Export default > Auto ident call ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = $(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = $(1));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(1);
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(1);
const tmpAnonDefaultExport /*:unknown*/ = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a;
export { b as default };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
