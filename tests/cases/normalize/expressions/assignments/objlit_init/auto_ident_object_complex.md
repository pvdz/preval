# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > objlit_init > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { x: $(1), y: 2, z: $(3) }) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitVal;
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$2 = 2;
const tmpObjLitVal$3 = $(3);
const tmpNestedComplexRhs = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: tmpObjLitVal$3 };
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
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
 - 3: { x: '{"x":"1","y":"2","z":"3"}' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
