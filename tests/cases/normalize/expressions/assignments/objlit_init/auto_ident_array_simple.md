# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > assignments > objlit_init > auto_ident_array_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = [1, 2, 3]) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = [1, 2, 3];
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '[1, 2, 3]' }
 - 2: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
