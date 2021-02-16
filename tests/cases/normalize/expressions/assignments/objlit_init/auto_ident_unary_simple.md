# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > objlit_init > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = typeof x) });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof x;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 'number';
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '"number"' }
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
