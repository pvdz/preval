# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > compound > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= [$(1), 2, $(3)]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
const tmpBinBothRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const tmpBinBothRhs = [tmpArrElement, 2, tmpArrElement$2];
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same