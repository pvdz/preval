# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > assignments > arr_element > auto_ident_unary_tilde_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)) + (a = ~$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = ~tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpUnaryArg$1 = $(100);
const tmpNestedComplexRhs$1 = ~tmpUnaryArg$1;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpUnaryArg = $(100);
const tmpNestedComplexRhs = ~tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpUnaryArg$1 = $(100);
const tmpNestedComplexRhs$1 = ~tmpUnaryArg$1;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: -202
 - 4: -101
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
