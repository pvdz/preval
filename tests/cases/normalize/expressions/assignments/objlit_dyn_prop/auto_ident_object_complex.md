# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = { x: $(1), y: 2, z: $(3) })]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = { x: $(1), y: 2, z: $(3) })]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const SSA_a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
const tmpCalleeParam = { [SSA_a]: 10 };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { '[object Object]': '10' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
