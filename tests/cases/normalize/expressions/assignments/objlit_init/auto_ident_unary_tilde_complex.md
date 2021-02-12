# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > assignments > objlit_init > auto_ident_unary_tilde_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = ~$(100)) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitVal;
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = ~tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjLitVal;
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = ~tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '-101' }
 - 3: -101
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
