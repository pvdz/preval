# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > assignments > compound > auto_ident_unary_typeof_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a *= typeof $(arg)));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpUnaryArg = $(arg);
const tmpBinBothRhs = typeof tmpUnaryArg;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpUnaryArg = $(arg);
const tmpBinBothRhs = typeof tmpUnaryArg;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same