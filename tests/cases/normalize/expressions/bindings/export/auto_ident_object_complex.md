# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident object complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { x: $(1), y: 2, z: $(3) };
export { a };
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
let a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
