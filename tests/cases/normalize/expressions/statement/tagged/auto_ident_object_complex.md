# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > statement > tagged > auto_ident_object_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${{ x: $(1), y: 2, z: $(3) }} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
const tmpCalleeParam$1 = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const tmpCalleeParam$1 = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: ['before ', ' after'], { x: '1', y: '2', z: '3' }
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
