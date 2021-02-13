# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > assignments > objlit_init > auto_ident_delete_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$({ x: (a = delete $(arg).y) });
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { x: 'true' }
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
