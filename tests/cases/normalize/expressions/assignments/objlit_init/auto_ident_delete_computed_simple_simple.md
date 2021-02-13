# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > objlit_init > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$({ x: (a = delete arg["y"]) });
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = delete arg['y'];
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg['y'];
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { x: 'true' }
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
