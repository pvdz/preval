# Preval test case

# auto_ident_unary_excl_complex.md

> normalize > expressions > assignments > objlit_spread > auto_ident_unary_excl_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = !$(100)) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = !tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjSpread;
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = !tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: {}
 - 3: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
