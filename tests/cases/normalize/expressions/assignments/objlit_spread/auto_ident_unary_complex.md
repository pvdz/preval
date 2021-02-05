# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > assignments > objlit_spread > auto_ident_unary_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = typeof $(x)) });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
const tmpUnaryArg = $(x);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
const tmpUnaryArg = $(1);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { 0: '"n"', 1: '"u"', 2: '"m"', 3: '"b"', 4: '"e"', 5: '"r"' }
 - 3: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
