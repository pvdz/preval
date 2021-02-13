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
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$2 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, z: tmpObjLitVal$3 };
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal$1, y: 2, z: tmpObjLitVal$3 };
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '{"x":"1","y":"2","z":"3"}' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same