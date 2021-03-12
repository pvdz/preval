# Preval test case

# nested_computed.md

> Normalize > Member access > Var init > Nested computed
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
let x = obj.a['b'];
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: $() } };
let x = obj.a['b'];
$(x);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj = obj.a;
let x = tmpCompObj.b;
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj = obj.a;
const x = tmpCompObj.b;
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
