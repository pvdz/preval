# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > assignments > arr_element > auto_ident_unary_void_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) + (a = void $(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(100);
a = undefined;
let tmpBinBothLhs = a;
$(100);
a = undefined;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let tmpBinBothLhs = a;
$(100);
a = undefined;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: NaN
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same