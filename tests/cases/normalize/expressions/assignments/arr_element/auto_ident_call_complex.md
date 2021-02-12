# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > assignments > arr_element > auto_ident_call_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) + (a = $($)(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $($);
a = tmpCallCallee$1(1);
let tmpBinBothLhs = a;
const tmpCallCallee$2 = $($);
a = tmpCallCallee$2(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $($);
a = tmpCallCallee$1(1);
let tmpBinBothLhs = a;
const tmpCallCallee$2 = $($);
a = tmpCallCallee$2(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
