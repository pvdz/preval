# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > objlit_init > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = "foo") });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitVal;
a = 'foo';
tmpObjLitVal = 'foo';
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjLitVal;
a = 'foo';
tmpObjLitVal = 'foo';
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '"foo"' }
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
