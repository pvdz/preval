# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Export default > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
export default a = (1, 2, b).c;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = (1, 2, b).c);
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = b;
a = tmpAssignRhsProp.c;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpAnonDefaultExport = 1;
export { tmpAnonDefaultExport as default };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = 1;
export { b as default from "undefined"
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
