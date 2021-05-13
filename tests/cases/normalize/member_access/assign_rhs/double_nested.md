# Preval test case

# double_nested.md

> Normalize > Member access > Assign rhs > Double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
let x = 10;
x = obj.a.b.c;
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: { c: $() } } };
let x = 10;
x = obj.a.b.c;
$(x);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let x = 10;
const tmpCompObj = obj.a;
const tmpAssignRhsProp = tmpCompObj.b;
x = tmpAssignRhsProp.c;
$(x);
`````

## Output

`````js filename=intro
const tmpObjLitVal$3 = $();
$(tmpObjLitVal$3);
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
