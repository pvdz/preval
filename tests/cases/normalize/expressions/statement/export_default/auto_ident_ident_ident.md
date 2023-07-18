# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Export default > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
export default b = 2;
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (b = 2);
export { tmpAnonDefaultExport as default };
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
let tmpAnonDefaultExport = b;
export { tmpAnonDefaultExport as default };
$(a, b, c);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = 2;
export { tmpAnonDefaultExport as default };
$(a, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = 2;
export { b as default from "undefined"
$( a, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
