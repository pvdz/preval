# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Export default > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = {});
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = {};
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const a = {};
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = a;
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
