# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > call_spread > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = { x: $(1), y: 2, z: $(3) }));
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
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same