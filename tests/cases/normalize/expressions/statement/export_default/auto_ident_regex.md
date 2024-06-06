# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Export default > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default /foo/;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = /foo/;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = /foo/;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = /foo/;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = /foo/;
export { b as default from "undefined"
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
