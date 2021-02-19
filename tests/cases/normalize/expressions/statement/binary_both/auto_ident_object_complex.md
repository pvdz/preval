# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > statement > binary_both > auto_ident_object_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: $(1), y: 2, z: $(3) } + { x: $(1), y: 2, z: $(3) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
const tmpBinBothLhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
const tmpObjLitVal$3 = $(1);
const tmpObjLitVal$4 = 2;
const tmpObjLitVal$5 = $(3);
const tmpBinBothRhs = { x: tmpObjLitVal$3, y: tmpObjLitVal$4, z: tmpObjLitVal$5 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const tmpBinBothLhs = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
const tmpObjLitVal$3 = $(1);
const tmpObjLitVal$5 = $(3);
const tmpBinBothRhs = { x: tmpObjLitVal$3, y: 2, z: tmpObjLitVal$5 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
