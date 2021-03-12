# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Export default > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default ($(1), $(2), $(x));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ($(1), $(2), $(x));
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpAnonDefaultExport = $(x);
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpAnonDefaultExport = $(1);
export { tmpAnonDefaultExport as default };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
