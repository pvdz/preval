# Preval test case

# auto_ident_unary_plus_complex.md

> normalize > expressions > assignments > objlit_spread > auto_ident_unary_plus_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = +$(100)) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = +tmpUnaryArg;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = +tmpUnaryArg;
const tmpCalleeParam = { ...SSA_a };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: {}
 - 3: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
