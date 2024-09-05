# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
export default $(b)["c"];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $(b)[`c`];
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpAnonDefaultExport = tmpCompObj.c;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpAnonDefaultExport = tmpCompObj.c;
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
export { c as default };
const d = {
  a: 999,
  b: 1000,
};
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
