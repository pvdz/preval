# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
({ x: $(1), y: 2, z: $(3) }["a"]);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
({ x: $(1), y: 2, z: $(3) }[`a`]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
const tmpCompObj = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
$(1);
$(3);
const tmpObjectPrototype = Object.prototype;
tmpObjectPrototype.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
