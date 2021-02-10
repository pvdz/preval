# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > binary_both > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) + (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpObjLitVal$3 = $(1);
const tmpObjLitVal$4 = 2;
const tmpObjLitVal$5 = $(3);
const tmpNestedComplexRhs$1 = { x: tmpObjLitVal$3, y: tmpObjLitVal$4, z: tmpObjLitVal$5 };
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: '[object Object][object Object]'
 - 6: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
