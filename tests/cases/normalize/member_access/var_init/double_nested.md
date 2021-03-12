# Preval test case

# double_nested.md

> Normalize > Member access > Var init > Double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
let x = obj.a.b.c;
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: { c: $() } } };
let x = obj.a.b.c;
$(x);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$2 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj$1 = obj.a;
const tmpCompObj = tmpCompObj$1.b;
let x = tmpCompObj.c;
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj$1 = obj.a;
const tmpCompObj = tmpCompObj$1.b;
const x = tmpCompObj.c;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
