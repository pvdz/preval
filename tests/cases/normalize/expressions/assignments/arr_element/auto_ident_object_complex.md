# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) + (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) + (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
let tmpBinBothLhs = a;
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$7 = 2;
const tmpObjLitVal$9 = $(3);
a = { x: tmpObjLitVal$5, y: tmpObjLitVal$7, z: tmpObjLitVal$9 };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const tmpSSA_a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
const tmpObjLitVal$5 = $(1);
const tmpObjLitVal$9 = $(3);
const tmpSSA_a$1 = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
const tmpCalleeParam = tmpSSA_a + tmpSSA_a$1;
$(tmpCalleeParam);
$(tmpSSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: '[object Object][object Object]'
 - 6: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
