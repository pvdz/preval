# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Export default > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = { b: $(1) };
a.b = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = { b: $(1) });
export { tmpAnonDefaultExport as default };
a.b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpSSA_a = { b: tmpObjLitVal };
const tmpAnonDefaultExport = tmpSSA_a;
export { tmpAnonDefaultExport as default };
tmpSSA_a.b = 2;
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
