# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Export default > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = /foo/;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = /foo/);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const a /*:regex*/ = /foo/;
const tmpAnonDefaultExport /*:unknown*/ = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
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
