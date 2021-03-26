# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { x: $(1), y: 2, z: $(3) })];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { x: $(1), y: 2, z: $(3) })];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const SSA_a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
obj[SSA_a];
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
