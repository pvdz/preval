# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Export default > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default () => {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = () => {
  debugger;
};
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as default from "undefined"
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
